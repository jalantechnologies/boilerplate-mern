import React from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <div class="container flex-shrink-0">
          <h1 class="mt-5">Home</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}