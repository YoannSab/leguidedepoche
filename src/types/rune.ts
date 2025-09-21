// Types pour les runes de League of Legends (Runes Reforged)
import { getRuneIconUrl as getRuneIconUrlFromConfig } from './champion';

export interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

export interface RuneSlot {
  runes: Rune[];
}

export interface RuneTree {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: RuneSlot[];
}

export type RunesReforgedData = RuneTree[];

// Utilitaires pour les URLs de runes
export const getRuneIconUrl = (iconPath: string) => {
  return getRuneIconUrlFromConfig(iconPath);
};

// Fonction pour rechercher une rune par ID
export const findRuneById = (runesData: RunesReforgedData, runeId: number): Rune | null => {
  for (const tree of runesData) {
    for (const slot of tree.slots) {
      for (const rune of slot.runes) {
        if (rune.id === runeId) {
          return rune;
        }
      }
    }
  }
  return null;
};

// Fonction pour rechercher un arbre de runes par ID
export const findRuneTreeById = (runesData: RunesReforgedData, treeId: number): RuneTree | null => {
  return runesData.find(tree => tree.id === treeId) || null;
};