# runner.py
import sys

try:
    code = sys.stdin.read()
    exec(code, {})
except Exception as e:
    import traceback
    traceback.print_exc(file=sys.stderr)
