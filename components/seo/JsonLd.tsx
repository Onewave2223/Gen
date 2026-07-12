import type { JsonValue } from "@/lib/seo/schema";

export interface JsonLdProps {
  data: JsonValue | JsonValue[];
}

/**
 * Safely renders one or more JSON-LD structured data blocks.
 *
 * Data passed here must only ever come from trusted, internal
 * sources (site config, the generator catalog, hardcoded page
 * content) and never from raw user input. The payload is serialized
 * with JSON.stringify and "<" is escaped to "\u003c" to reduce the
 * risk of the JSON payload breaking out of the <script> tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

JsonLd.displayName = "JsonLd";
