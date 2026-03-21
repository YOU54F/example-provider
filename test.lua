local json = require("dkjson")
local payload = {status = "ok"}
print(json.encode(payload))