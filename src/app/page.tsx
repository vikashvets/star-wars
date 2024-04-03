"use client"
import {ChakraProvider} from '@chakra-ui/react'
import React from "react";
import {ReactFlowProvider} from "reactflow";
import Home from "@/app/_components/Home";

export default function App() {

  return (
      <ChakraProvider>
          <ReactFlowProvider>
             <Home/>
          </ReactFlowProvider>
      </ChakraProvider>
  );
}
