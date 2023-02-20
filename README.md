
# Getting started

![taxdowngift](https://user-images.githubusercontent.com/73916781/220112347-846d202f-6fe7-4775-b5d0-9eac2e90f8a1.gif)

Clone the project and then, inside the folder, do the following steps:
```
npm install
npm install -g json-server
json-server ./db/db.json --routes ./db/routes.json
cd ios ----> pod install  <---- for ios only
npx react-native run-android
```
You will need to open 2 terminals, one for  **json-server**  and the other one for **react-native**
