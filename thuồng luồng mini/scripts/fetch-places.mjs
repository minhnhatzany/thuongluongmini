import fs from 'fs';

const PROJECT_ID = 'thuongluongmini';
const URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/places`;

// Hàm gỡ bọc cấu trúc lằng nhằng của Firestore REST API
function unwrapFirestoreData(fields) {
  if (!fields) return null;
  const result = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value.stringValue !== undefined) result[key] = value.stringValue;
    else if (value.integerValue !== undefined) result[key] = parseInt(value.integerValue, 10);
    else if (value.doubleValue !== undefined) result[key] = parseFloat(value.doubleValue);
    else if (value.booleanValue !== undefined) result[key] = value.booleanValue;
    else if (value.arrayValue !== undefined) {
      result[key] = (value.arrayValue.values || []).map(v => unwrapFirestoreData({ temp: v }).temp);
    }
    else if (value.mapValue !== undefined) {
      result[key] = unwrapFirestoreData(value.mapValue.fields);
    }
    else if (value.nullValue !== undefined) result[key] = null;
  }
  return result;
}

async function fetchPlaces() {
  try {
    console.log('Fetching places from Firestore...');
    const response = await fetch(URL);
    if (!response.ok) {
      console.error('Failed to fetch from Firestore:', response.statusText);
      return;
    }
    const data = await response.json();
    
    const places = (data.documents || []).map(doc => {
      // Lấy ID từ path document (phần cuối cùng của tên)
      const pathParts = doc.name.split('/');
      const id = pathParts[pathParts.length - 1];
      
      const unwrapped = unwrapFirestoreData(doc.fields);
      return {
        id,
        ...unwrapped
      };
    });

    console.log(`Fetched ${places.length} places from Firestore.`);
    fs.writeFileSync('./src/lib/dynamic-places.json', JSON.stringify(places, null, 2));
    console.log('Saved to src/lib/dynamic-places.json');
  } catch (error) {
    console.error('Error fetching places:', error);
    fs.writeFileSync('./src/lib/dynamic-places.json', '[]');
  }
}

fetchPlaces();
