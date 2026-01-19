// Centralized camp configuration
// Position limits can be easily adjusted here

export interface CampConfig {
  id: string;
  name: string;
  sheetName: string;
  hasPositionLimits: boolean;
  positionLimits?: Record<string, number>;
}

// Position limits for camps - easily expandable
// Set a position to 0 to temporarily close it, or increase the number to add spots
export const POSITION_LIMITS: Record<string, Record<string, number>> = {
  'clash': {
    'Attack': 40,
    'Midfield': 50,
    'Defense': 40,
    'Goalie': 10,
    'LSM': 15,
    'Face Off': 10,
  },
  'bulldog-120': {
    'Attack': 28,
    'Midfield': 40,
    'Defense': 20,
    'Goalie': 6,
    'LSM': 8,
    'Face Off': 8,
  },
  'experience': {
    'Attack': 28,
    'Midfield': 40,
    'Defense': 20,
    'Goalie': 6,
    'LSM': 8,
    'Face Off': 8,
  },
};

// Map camp IDs to Google Sheet names
export const CAMP_SHEET_NAMES: Record<string, string> = {
  'test': 'Test',
  'summer': 'BLC26',
  'bulldog-120': 'B12026',
  'experience': 'BEx26',
  'clash': 'BClash26',
};

// Camps that have position limits enabled
export const CAMPS_WITH_LIMITS = ['clash', 'bulldog-120', 'experience'];

// Helper to check if a camp has position limits
export function hasPositionLimits(campId: string): boolean {
  return CAMPS_WITH_LIMITS.includes(campId);
}

// Helper to get position limits for a camp
export function getPositionLimits(campId: string): Record<string, number> | null {
  return POSITION_LIMITS[campId] || null;
}

// Helper to get sheet name for a camp
export function getSheetName(campId: string): string {
  return CAMP_SHEET_NAMES[campId] || 'Other';
}
