import { permanentRedirect } from 'next/navigation';

export default function SolarCalculatorResultRedirect() {
  permanentRedirect('/tools/solar-savings-calculator');
}
