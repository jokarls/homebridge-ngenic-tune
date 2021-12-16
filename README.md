# Homebridge Ngenic Tune Plugin

This plugin displays the temperature from the indoor sensor

## Sample data
```
curl -X GET -H "Authorization: Bearer ${NGENIC_TOKEN}" https://app.ngenic.se/api/v3/tunes | jq
```

```
[
  {
    "isInstalled": true,
    "isNetworkConnected": true,
    "name": "Jonas Lundblad",
    "priceArea": 3,
    "tuneName": "Skogshemsvägen 9",
    "tuneUuid": "e3f05058-efcf-4184-a51e-25840c9461e5",
    "userName": "jonas.lmk@gmail.com"
  }
]
```
```
curl -X GET -H "Authorization: Bearer ${NGENIC_TOKEN}" https://app.ngenic.se/api/v3/tunes/e3f05058-efcf-4184-a51e-25840c9461e5/rooms | jq
```
```
[
  {
    "uuid": "1e411edc-9b3e-4e36-ab68-7a9076e8bd2c",
    "hasDefaultValues": false,
    "name": "Vardagsrum",
    "nodeUuid": "cd49f1c7-3373-4ca7-b287-62df56c2431a",
    "targetTemperature": 20,
    "activeControl": true
  }
]
```
```
curl -X GET -H "Authorization: Bearer ${NGENIC_TOKEN}" "https://app.ngenic.se/api/v3/tunes/e3f05058-efcf-4184-a51e-25840c9461e5/measurements/cd49f1c7-3373-4ca7-b287-62df56c2431a/latest?type=temperature_C" | jq
```
```
{
  "hasValue": true,
  "time": "2021-12-13T11:12:02 Europe/Stockholm",
  "value": 20.625
}
```
