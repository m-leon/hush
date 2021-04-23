/// <reference types="next" />
/// <reference types="next/types/global" />

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
