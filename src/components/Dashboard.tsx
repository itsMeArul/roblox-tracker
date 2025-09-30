'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CardData, DetailData, ExploitData, RobloxVersions } from '@/types';
import CategoryTabs from '@/components/CategoryTabs';
import CardGrid from '@/components/CardGrid';
import DetailModal from '@/components/DetailModal';
import Navbar from '@/components/Navbar';
import RobloxVersionCard from '@/components/RobloxVersionCard';
import Footer from '@/components/Footer';
import { Squares } from '@/components/Squares';

export default function Dashboard() {
  const [data, setData] = useState<CardData[]>([]);
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [robloxVersions, setRobloxVersions] = useState<RobloxVersions | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<DetailData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const originalExploitDataRef = useRef<ExploitData[]>([]);
  const cachedDataHashRef = useRef<string>('');
  const cachedVersionHashRef = useRef<string>('');
  const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateDataHash = (data: ExploitData[]): string => {
    return JSON.stringify(data.map(item => ({
      id: item._id,
      version: item.version,
      updatedDate: item.updatedDate,
      updateStatus: item.updateStatus
    })));
  };

  const generateVersionHash = (versions: RobloxVersions): string => {
    return JSON.stringify(versions);
  };

  const transformExploitData = (exploitData: ExploitData[]): CardData[] => {
    return exploitData.map(exploit => ({
      id: exploit._id,
      name: exploit.title,
      platform: exploit.platform.toLowerCase(),
      version: exploit.version,
      last_update: exploit.updatedDate,
      cost: exploit.free ? 'Free' : (exploit.cost || 'Paid'),
      status: exploit.updateStatus ? 'Updated' : 'Outdated',
      updateStatus: exploit.updateStatus,
      detected: exploit.detected,
      free: exploit.free
    }));
  };

  const transformToDetailData = (exploitData: ExploitData[], cardData: CardData): DetailData => {
    const originalData = exploitData.find(exploit => exploit._id === cardData.id);
    if (!originalData) return cardData as DetailData;

    return {
      ...cardData,
      description: `${originalData.extype} - ${originalData.detected ? 'Detected' : 'Undetected'} - ${originalData.uncStatus ? 'UNC Compatible' : 'UNC Incompatible'}`,
      developer: originalData.websitelink ? new URL(originalData.websitelink).hostname : undefined,
      websitelink: originalData.websitelink,
      discordlink: originalData.discordlink,
      purchaselink: originalData.purchaselink,
      uncPercentage: originalData.uncPercentage,
      suncPercentage: originalData.suncPercentage,
      decompiler: originalData.decompiler,
      multiInject: originalData.multiInject,
      keysystem: originalData.keysystem,
      elementCertified: originalData.elementCertified,
      extype: originalData.extype,
      rbxversion: originalData.rbxversion
    };
  };

  const extractCategories = useCallback((data: CardData[]) => {
    const uniquePlatforms = [...new Set(data.map(item => item.platform))];
    const allCategories = ['all', ...uniquePlatforms.sort()];
    setCategories(allCategories);
  }, []);

  const filterDataByCategory = useCallback(() => {
    if (activeCategory === 'all') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.platform === activeCategory));
    }
  }, [data, activeCategory]);

  const fetchData = useCallback(async () => {
    try {
      const exploitResponse = await fetch('/api/exploits');

      if (!exploitResponse.ok) {
        throw new Error(`HTTP error! status: ${exploitResponse.status}`);
      }

      const exploitResult: ExploitData[] = await exploitResponse.json();

      const newDataHash = generateDataHash(exploitResult);
      const hasExploitChanges = newDataHash !== cachedDataHashRef.current;

      let versionResult: RobloxVersions | null = null;
      let hasVersionChanges = false;

      try {
        const versionResponse = await fetch('/api/versions');

        if (versionResponse.ok) {
          versionResult = await versionResponse.json();
          const newVersionHash = generateVersionHash(versionResult);
          hasVersionChanges = newVersionHash !== cachedVersionHashRef.current;

          if (hasVersionChanges) {
            cachedVersionHashRef.current = newVersionHash;
            setRobloxVersions(versionResult);
          }
        }
      } catch (versionError) {
        console.warn('Failed to fetch Roblox versions:', versionError);
      }

      if (hasExploitChanges) {
        console.log('🔄 Data changed! Updating display...');
        cachedDataHashRef.current = newDataHash;

        if (Array.isArray(exploitResult)) {
          const transformedData = transformExploitData(exploitResult);
          setData(transformedData);
          originalExploitDataRef.current = exploitResult;
          extractCategories(transformedData);
          setLastUpdated(new Date());

          if (isLoading) {
            setIsLoading(false);
          }
        }
      } else {
        console.log('✅ No changes detected. Data is up to date.');

        if (isLoading) {
          if (Array.isArray(exploitResult)) {
            const transformedData = transformExploitData(exploitResult);
            setData(transformedData);
            originalExploitDataRef.current = exploitResult;
            extractCategories(transformedData);
            setLastUpdated(new Date());
          }
          setIsLoading(false);
        }
      }

      if (hasExploitChanges || hasVersionChanges) {
        console.log(`📊 Updated at: ${new Date().toLocaleTimeString()}`);
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setIsLoading(false);
    }
  }, [extractCategories, isLoading]);

  useEffect(() => {
    fetchData();

    fetchIntervalRef.current = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      if (fetchIntervalRef.current) {
        clearInterval(fetchIntervalRef.current);
      }
    };
  }, [fetchData]);

  useEffect(() => {
    filterDataByCategory();
  }, [filterDataByCategory]);

  useEffect(() => {
    if (data.length > 0) {
      extractCategories(data);
    }
  }, [data, extractCategories]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleCardClick = (cardData: CardData) => {
    const detailData = transformToDetailData(originalExploitDataRef.current, cardData);
    setSelectedItem(detailData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Data</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black
                     rounded-lg font-medium hover:from-gray-100 hover:to-gray-300
                     transition-all duration-300 shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="animated-grid-background">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(255, 255, 255, 0.1)"
          squareSize={50}
          hoverFillColor="rgba(255, 255, 255, 0.05)"
        />
      </div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Roblox Tracker
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-2">
              Monitor the latest Roblox client versions and exploit application status
            </p>
            {lastUpdated && (
              <p className="text-sm text-white/60">
                Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refresh: Every 30s
              </p>
            )}
          </header>

          <RobloxVersionCard versions={robloxVersions} />

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />

          <CardGrid
            items={filteredData}
            isLoading={isLoading}
            onCardClick={handleCardClick}
          />

          <DetailModal
            data={selectedItem}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}