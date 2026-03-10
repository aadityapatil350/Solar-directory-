import { PrismaClient } from '@prisma/client';
import { installers } from './prisma/seed-comprehensive';

const prisma = new PrismaClient();

// Enquiry counts based on city population size
// Mumbai/Delhi (tier 1): 20-25 enquiries/week
// Bangalore/Pune/Hyderabad (tier 2): 15-20 enquiries/week
// Chennai/Kolkata/Ahmedabad (tier 2): 12-18 enquiries/week
// Other cities (tier 3): 3-10 enquiries/week
const CITY_ENQUIRY_RANGES: Record<string, [number, number]> = {
  'Mumbai': [20, 25],
  'Delhi': [20, 25],
  'Bangalore': [15, 20],
  'Pune': [15, 20],
  'Hyderabad': [12, 18],
  'Chennai': [12, 18],
  'Ahmedabad': [12, 18],
  // Other cities will get 3-10
  'Jaipur': [3, 10],
  'Lucknow': [3, 10],
  'Kolkata': [3, 10],
  'Surat': [3, 10],
  'Indore': [3, 10],
  'Nagpur': [3, 10],
  'Kanpur': [3, 10],
  'Agra': [3, 10],
  'Vadodara': [3, 10],
  'Coimbatore': [3, 10],
  'Rajkot': [3, 10],
  'Bhopal': [3, 10],
  'Bhubaneswar': [3, 10],
  'Ludhiana': [3, 10],
  'Guwahati': [3, 10],
  'Ranchi': [3, 10],
  'Jamshedpur': [3, 10],
  'Raipur': [3, 10],
};

async function main() {
  console.log('Seeding realistic enquiry counts for installers...');

  for (const city of Object.keys(CITY_ENQUIRY_RANGES)) {
    // Get all installers in this city
    const cityInstallers = await prisma.installer.findMany({
      where: {
        user: {
          listings: {
            some: {
              location: {
                city: {
                  equals: city,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        enquiryCount: true,
      },
    });

    const cityEnquryRange = CITY_ENQUIRY_RANGES[city as keyof typeof CITY_ENQUIRY_RANGES];
    if (!cityEnquryRange) continue;

    const [minEnq, maxEnq] = cityEnquryRange;

    // Shuffle installers and assign random enquiry counts within range
    const shuffled = [...cityInstallers].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffled.length && i < minEnq; i++) {
      shuffled[i] = Math.floor(Math.random() * (maxEnq - minEnq + 1)) + minEnq;
    }

    // Update installers with enquiry counts
    for (let i = 0; i < shuffled.length; i++) {
      const installer = shuffled[i];
      await prisma.installer.update({
        where: { id: installer.id },
        data: { enquiryCount: shuffled[i] },
      });
    }

    // For remaining installers without minimum (if any), assign 0
    if (shuffled.length < cityInstallers.length) {
      for (let i = minEnq; i < shuffled.length; i++) {
        const installer = shuffled[i];
        await prisma.installer.update({
          where: { id: installer.id },
          data: { enquiryCount: 0 },
        });
      }
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch((error) => {
    console.error('Error seeding enquiry counts:', error);
    process.exit(1);
  });
