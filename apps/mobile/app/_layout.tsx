/**
 * DigitSoft AI Mobile App
 * Root Layout
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        {/* Routes will be added here */}
        {/* TODO: Add /chat, /history, /settings */}
      </Stack>
    </>
  );
}
