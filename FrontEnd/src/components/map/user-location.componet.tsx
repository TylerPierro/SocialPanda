// import * as React from "react";

// // interface IProps extends IUserLocation {
// //     submitNewPost: (newPost: string) => void
// //     updateCity: (city: string) => void
// //     updateDisplay1: (displayGroups: string) => void
// //     updateDisplay2: (displayGroups: string, displayTags: string) => void
// //     updateError: (error: string) => void
// //     updateMsgBoard: (msgBoard: object) => void
// //     updateNewPost: (box: string) => void
// //     updateTag: (tag: string) => void
// // }

// function prompt(window, pref, message, callback) {
//     // const branch = Components.classes["@mozilla.org/preferences-service;1"]
//     //     .getService(Components.interfaces.nsIPrefBranch);

//     // if (branch.getPrefType(pref) === branch.PREF_STRING) {
//     //     switch (branch.getCharPref(pref)) {
//     //         case "always":
//     //             return callback(true);
//     //         case "never":
//     //             return callback(false);
//     //     }
//     // }
//     // let done = false;

//     function remember(value, result) {
//         return () => {
//             done = true;
//             branch.setCharPref(pref, value);
//             callback(result);
//         }
//     }

//     const self = window.PopupNotifications.show(
//         window.gBrowser.selectedBrowser,
//         "geolocation",
//         message,
//         "geo-notification-icon",
//         {
//             accessKey: "S",
//             callback (notification) {
//                 done = true;
//                 callback(true);
//             },
//             label: "Share Location"
//         }, [
//             {
//                 accessKey: "A",
//                 callback: remember("always", true),
//                 label: "Always Share"
//             },
//             {
//                 accessKey: "N",
//                 callback: remember("never", false),
//                 label: "Never Share"
//             }
//         ], {
//             eventCallback (event) {
//                 if (event === "dismissed") {
//                     if (!done) { callback(false) };
//                     done = true;
//                     window.PopupNotifications.remove(self);
//                 }
//             },
//         persistWhileVisible: true
//     });
// }


// export 

// prompt(window,
//     "extensions.foo-addon.allowGeolocation",
//     "Foo Add-on wants to know your location.",
//     function callback(allowed) { alert(allowed); });
// // getCoords();

// export class UserLocationComponent extends React.Component<IProps, any> {
//     constructor(props: any) {
//         super(props);
//         console.log(props);
//     }

//     public getCoords(): Coordinates {
//         if ("geolocation" in navigator) {
//             /* geolocation is available */
//             let coords: Coordinates = new Coordinates();
//             navigator.geolocation.getCurrentPosition(position => {
//                 coords = position.coords;
//             })
//             return coords;
//         } else {
//             /* geolocation IS NOT available */
//             return new Coordinates();
//         }
//     }

//     public render() {
//         return(
//             <div> 
//                 <h1>Some maps</h1>
//                 <h2>{this.getCoords}</h2>
//             </div>
//         );
//     }
// }