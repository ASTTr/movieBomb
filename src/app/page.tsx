import Image from "next/image";

import { Navbar } from "@/components/navbar";
import React from "react";
import { Dashoard } from "@/components/dashboard";
// import axios from "axios";

export default function Home() {
  // axios.defaults.baseURL = "/api/";
  return (
    <main className="flex flex-col  bg-gradient-to-r from-blue-900  to-blue-200">
      <Dashoard />
    </main>
  );
}
