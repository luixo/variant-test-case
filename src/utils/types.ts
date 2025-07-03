type ExtractParam<Path, NextPart> = Path extends `[${infer Param}]`
  ? Record<Param, string> & NextPart
  : NextPart;

type ExtractParams<Path> = Path extends `${infer Segment} ${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, Record<never, string>>;

export type ExtractMultiline<Path> = Path extends `${infer Line}\n${infer Rest}`
  ? ExtractParams<Line> & ExtractMultiline<Rest>
  : ExtractParams<Path>;
