import type { ResearchAreaCode, ResearchStatus } from "./content";

/**
 * Research Atlas view model: the client/server contract.
 *
 * Deliberately separate from the query that produces it. The query is
 * `server-only` (it reaches into the content layer), while these types and the
 * root identifier are needed by client components too. Keeping them here means
 * importing the shape never drags the content layer into the browser bundle:
 * which is precisely the leak the `server-only` marker exists to prevent.
 *
 * Stage 7 §36, §46: client components receive the minimum serialised data
 * needed, transformed before the boundary.
 */

export type AtlasNodeType = "root" | "area" | "subdomain" | "program" | "project";

export type AtlasNode = {
  id: string;
  parentId?: string;
  type: AtlasNodeType;
  label: string;
  /** Drives the domain colour; inherited down the branch. */
  code?: ResearchAreaCode;
  href?: string;
  status?: ResearchStatus;
  summary?: string;
  sample?: boolean;
  counts?: {
    areas?: number;
    subdomains?: number;
    programs?: number;
    projects?: number;
    experiments?: number;
    publications?: number;
  };
};

export type AtlasData = {
  nodes: AtlasNode[];
};

export const ATLAS_ROOT_ID = "omnexa-research";
