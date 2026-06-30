import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import DoctorCredentials from "@/components/DoctorCredentials";
import ClinicInfo from "@/components/ClinicInfo";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Loader />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatsSection />
      <DoctorCredentials />
      <ClinicInfo />
      <AppointmentForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
