# Changelog

## 0.1.0

Breaking: remove `initTeampilotCollection` and its `getInfo`, `upsertItems`, `searchItems`, `deleteOne` and `deleteAll` methods as Teampilot retires its Qdrant-based collections API.

Remove the `/collections` documentation/demo route, collection API navigation stubs and the demo collection secret declaration. Other SDK APIs remain available. Deploy this documentation change before retiring the collection endpoints. Publishing the package is a separate release action.
