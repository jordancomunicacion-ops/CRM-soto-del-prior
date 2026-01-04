import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Fetch from Open-Meteo (Current Weather for a default location, e.g., Madrid or User's Loc)
        // Replace LAT/LONG with actual location of SOTO del PRIOR
        const lat = 40.4168;
        const lon = -3.7038;

        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`);
        const data = await res.json();

        if (!data.current) throw new Error('Failed to fetch weather data');

        const current = data.current;

        // 2. Map WMO Weather Code to String
        const weatherCodes: any = {
            0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
            45: 'Fog', 48: 'Depositing rime fog',
            51: 'Drizzle: Light', 53: 'Drizzle: Moderate', 55: 'Drizzle: Dense',
            61: 'Rain: Slight', 63: 'Rain: Moderate', 65: 'Rain: Heavy',
            // ... add more as needed
        };
        const condition = weatherCodes[current.weather_code] || 'Unknown';

        // 3. Log to DB
        const log = await prisma.hourlyWeather.create({
            data: {
                hour: new Date().getHours(),
                temperature: current.temperature_2m,
                condition: condition,
                precipitation: current.precipitation,
                humidity: current.relative_humidity_2m,
                windSpeed: current.wind_speed_10m
            }
        });

        return NextResponse.json({ success: true, log });
    } catch (error) {
        console.error('Weather Sync Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
