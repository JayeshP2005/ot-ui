"use client"
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {ctx} from "@/context/ctxContext"
import { useContext } from "react";
import { Test } from "@/components/Test";
import {Login} from "@/components/Login";

export default function Home() {
  const ctxdata=useContext(ctx);
  const {state}=ctxdata;
  return (
    <div>
      <Header/>
      {state.isLoggedin ? <Test/> : <Login/>}
      <Footer/>
    </div>
  );
}
