import jsPDF from 'jspdf';
import { Itinerary } from '@/types/itinerary';

/**
 * Generates a PDF itinerary and triggers download
 * @param itinerary The itinerary data to include in the PDF
 */
export function generateTripPdf(itinerary: Itinerary): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // Title
  doc.setFontSize(24);
  doc.setTextColor(30, 30, 30);
  doc.text(`Trip to ${itinerary.destination}`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });
  y += 20;

  // Days
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  itinerary.days.forEach((day) => {
    // Check if we need a new page
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    doc.text(`Day ${day.day}: ${day.theme}`, 15, y);
    y += 10;

    day.activities.forEach((activity) => {
      // Check if we need a new page
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }

      // Time and title
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      doc.text(`${activity.time} - ${activity.title}`, 20, y);
      y += 6;

      // Description
      doc.setFontSize(10);
      doc.setTextColor(70, 70, 70);
      doc.text(activity.description, 25, y);
      y += 6;

      // Place info if available
      if (activity.place) {
        doc.setFontSize(9);
        doc.setTextColor(90, 90, 90);
        doc.text(`📍 ${activity.place.display_name}`, 25, y);
        y += 5;
      }

      y += 4; // Extra space between activities
    });

    y += 10; // Space between days
  });

  // Save the PDF
  doc.save(`${itinerary.destination.replace(/\s+/g, '-')}_itinerary.pdf`);
}