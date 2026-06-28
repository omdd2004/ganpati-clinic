import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClinicInfo from "@/components/ClinicInfo";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ClinicInfo />
      <AppointmentForm />
      <Footer />
    </main>
  );
}
