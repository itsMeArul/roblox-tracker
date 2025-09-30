# Roblox Tracker - Version & Exploit Status Monitor

A modern, responsive web application built with Next.js that monitors the latest Roblox client versions and exploit application status. The application sources all its data from the WEAO API and features a beautiful glassmorphism design with gradient accents.

## Features

- **Real-time Data**: Fetches the latest exploit and version information from the WEAO API
- **Modern Design**: Glassmorphism UI with gradient backgrounds and smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Category Filtering**: Switch between different platforms (Windows, Android, macOS, etc.)
- **Detailed Modal Views**: Click on any item to see comprehensive details
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast loading
- **Loading States**: Skeleton loaders and error handling for better UX

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **API**: WEAO API (https://weao.xyz/)
- **Deployment**: Ready for Vercel deployment

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd roblox-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with glassmorphism effects
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Dashboard.tsx        # Main dashboard container
│   ├── CategoryTabs.tsx     # Platform category navigation
│   ├── CardGrid.tsx         # Grid layout for exploit cards
│   ├── InfoCard.tsx         # Individual exploit/version card
│   └── DetailModal.tsx      # Modal for detailed information
└── types/
    └── index.ts             # TypeScript type definitions
```

## API Integration

The application fetches data from:
- **Primary**: `GET https://weao.xyz/api/status/exploits` - Returns all exploit data
- **Data Format**: Each item includes name, platform, version, last_update, cost, and optional fields

## Design Features

- **Glassmorphism**: Semi-transparent cards with backdrop blur effects
- **Gradient Backgrounds**: Purple to violet gradient with dynamic lighting
- **Interactive Elements**: Hover effects, smooth transitions, and click animations
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Modern Typography**: Clean, readable fonts with proper contrast

## Performance

- **Fast Loading**: Optimized with Next.js SSR and Turbopack
- **Efficient Filtering**: Client-side category switching without API calls
- **Lazy Loading**: Components and assets loaded on demand
- **SEO Optimized**: Proper meta tags and structured data

## Development

To modify the application:

1. **Add new components** in the `src/components/` directory
2. **Update styles** in `src/app/globals.css` or component files
3. **Modify types** in `src/types/index.ts` for new data structures
4. **Test responsiveness** across different screen sizes

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

For Vercel deployment, simply connect your repository and deploy automatically.

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices
5. Submit a pull request

## License

This project is created for educational and monitoring purposes. Please ensure compliance with all relevant terms of service and usage policies.
