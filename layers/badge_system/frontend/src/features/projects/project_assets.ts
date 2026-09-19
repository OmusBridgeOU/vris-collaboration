const svg_data_url = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export const placeholder_badge_image = (label: string, hue = 172) =>
  svg_data_url(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="#ffffff"/>
  <circle cx="540" cy="540" r="450" fill="hsl(${hue} 54% 92%)" stroke="hsl(${hue} 65% 32%)" stroke-width="24"/>
  <circle cx="540" cy="540" r="350" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="18 18"/>
  <text x="540" y="518" text-anchor="middle" font-family="Arial, sans-serif" font-size="82" font-weight="700" fill="#1d242d">${label}</text>
  <text x="540" y="610" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" fill="#475569">Badge Design</text>
</svg>`);

export const project_thumbnail = (label: string) =>
  placeholder_badge_image(label, 192);
