"use client";

import { useState } from "react";
import MotionProvider from "@/components/MotionProvider";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Hero from "@/components/Hero";
import VisionIntro from "@/components/VisionIntro";
import DriverEngineering from "@/components/DriverEngineering";
import CinematicInterlude from "@/components/CinematicInterlude";
import Manifesto from "@/components/Manifesto";
import RoadsterSystems from "@/components/RoadsterSystems";
import MaterialInterlude from "@/components/MaterialInterlude";
import PurposeSection from "@/components/PurposeSection";
import JournalList from "@/components/JournalList";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionProvider>
      <CustomCursor />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="top">
        <Hero />
        <VisionIntro />
        <DriverEngineering />
        <CinematicInterlude />
        <Manifesto />
        <RoadsterSystems />
        <MaterialInterlude />
        <PurposeSection />
        <JournalList />
        <ReservationSection />
        <Footer />
      </main>
    </MotionProvider>
  );
}
