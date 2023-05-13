import { test, describe, expect } from "vitest";
import { parseLine, shouldApplyAnnotation } from "../index";

describe("parseLine() can parse comment lines", () => {
  test("  -------  ", async () => {
    const result = parseLine("  -------");
    expect(result).toEqual({
      type: "DirectiveUnderline",
      config: {
        content: "-------",
        offset: 2,
        style: "solid",
      },
    });
  });

  test("  ~~~~~~~~  ", async () => {
    const result = parseLine("  ~~~~~~~~");
    expect(result).toEqual({
      type: "DirectiveUnderline",
      config: {
        content: "~~~~~~~~",
        offset: 2,
        style: "wavy",
      },
    });
  });

  test("  ......  ", async () => {
    const result = parseLine("  ......");
    expect(result).toEqual({
      type: "DirectiveUnderline",
      config: {
        content: "......",
        offset: 2,
        style: "dotted",
      },
    });
  });

  test("   [This is annotation]  ", async () => {
    const result = parseLine("   [This is annotation]");
    expect(result).toEqual({
      type: "AnnotationLine",
      config: {
        content: "This is annotation",
        offset: 3,
      },
    });
  });

  test("   [This is annotation]  ", async () => {
    const result = parseLine("   [This is annotation]");
    expect(result).toEqual({
      type: "AnnotationLine",
      config: {
        content: "This is annotation",
        offset: 3,
      },
    });
  });

  test("   ^  ", async () => {
    const result = parseLine("   ^  ");
    expect(result).toEqual({
      type: "DirectiveCallout",
      config: {
        offset: 3,
      },
    });
  });

  test("   @collapse start ", async () => {
    const result = parseLine("   @collapse start ");
    expect(result).toEqual({
      type: "DirectiveCollapse",
      config: {
        offset: 3,
        mark: "start",
      },
    });
  });

  test("   @collapse end ", async () => {
    const result = parseLine("   @collapse end ");
    expect(result).toEqual({
      type: "DirectiveCollapse",
      config: {
        offset: 3,
        mark: "end",
      },
    });
  });

  test("   @collapse unexpected ", async () => {
    const func = () => parseLine("   @collapse unexpected ");
    expect(func).toThrow();
  });

  test("   @highlight start ", async () => {
    const result = parseLine("   @highlight start ");
    expect(result).toEqual({
      type: "DirectiveHighlight",
      config: {
        mark: "start",
      },
    });
  });

  test("   @highlight end ", async () => {
    const result = parseLine("   @highlight end ");
    expect(result).toEqual({
      type: "DirectiveHighlight",
      config: {
        mark: "end",
      },
    });
  });

  test("   @highlight ", async () => {
    const result = parseLine("   @highlight ");
    expect(result).toEqual({
      type: "DirectiveHighlight",
      config: {
        mark: "below",
      },
    });
  });

  test("   @highlight below ", async () => {
    const result = parseLine("   @highlight below ");
    expect(result).toEqual({
      type: "DirectiveHighlight",
      config: {
        mark: "below",
      },
    });
  });

  test("   @highlight unexpected ", async () => {
    const func = () => parseLine("   @highlight unexpected ");
    expect(func).toThrow();
  });

  test("This is some comments from source code ", async () => {
    const result = parseLine("This is some comments from source code");
    expect(result).toBeNull();
  });
});

describe("shouldApplyAnnotation() should work", () => {
  test(" annotate ", () => {
    expect(shouldApplyAnnotation(" annotate ")).toBeTruthy();
  });

  test(" ", () => {
    expect(shouldApplyAnnotation("  ")).toBeFalsy();
  });
});