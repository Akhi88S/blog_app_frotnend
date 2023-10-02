import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RootPostList from "./root.postList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <RootPostList />
      <Footer />
    </div>
  );
}
