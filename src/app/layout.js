"use client"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css"
import React,{ useReducer } from 'react'
import { init } from "@/common/init";
import { Provider } from "@/context/ctxContext";
import { appReducer } from "@/reducer/appReducer";

export default function RootLayout({ children }) {
  const [state,dispatch]=useReducer(appReducer,init);
  return (
    <html lang="en">
      <body>
        <Provider value={{state,dispatch}}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
