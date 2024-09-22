export interface TocHeading {
  level: number;
  text: string;
  displayText?: string;
  slug?: string;
}

export interface TocProps {
  headings: TocHeading[];
}

export interface TocItemProps {
  heading: TocHeading;
  isExpanded: boolean;
  toggleSection: (slug: string) => void;
  subHeadings: TocHeading[];
}