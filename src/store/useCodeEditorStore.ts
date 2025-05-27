import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      theme: "vs-dark",
      fontSize: 16,
    };
  }
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();
  return {
    ...initialState,
    output: "",
    editor: null,
    isRunning: false,
    executionResult: null,
    error: null,

    getCode: () => get().editor?.getValue() || "",
    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode)
        localStorage.setItem(`editor-code-${get().language}`, currentCode);

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },
    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Code is empty" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        // Dynamically build the URL using the selected language
        const url = `http://localhost:8000/run/${language}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: code, // send raw code
        });

        const data = await response.json();
        console.log("this is data back from backend:", data.output);

        if (data.error) {
          set({
            error: data.error,
            executionResult: {
              code,
              output: "",
              error: data.error,
            },
          });
          return;
        }

        const output = data.output || "";

        set({
          output: output,
          error: null,
          executionResult: {
            code,
            output: output,
            error: null,
          },
        });
      } catch (error) {
        console.error("Error running the code", error);
        set({
          error: "Error running the code",
          executionResult: {
            code,
            output: "",
            error: "Error running the code",
          },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () =>
  useCodeEditorStore.getState().executionResult;
