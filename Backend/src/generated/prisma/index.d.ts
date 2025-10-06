
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PasswordUser
 * 
 */
export type PasswordUser = $Result.DefaultSelection<Prisma.$PasswordUserPayload>
/**
 * Model OAuthUser
 * 
 */
export type OAuthUser = $Result.DefaultSelection<Prisma.$OAuthUserPayload>
/**
 * Model Organizer
 * 
 */
export type Organizer = $Result.DefaultSelection<Prisma.$OrganizerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GENDER: {
  M: 'M',
  F: 'F',
  O: 'O'
};

export type GENDER = (typeof GENDER)[keyof typeof GENDER]


export const STATUS_USER: {
  A: 'A',
  S: 'S',
  D: 'D'
};

export type STATUS_USER = (typeof STATUS_USER)[keyof typeof STATUS_USER]


export const ID_TYPE: {
  RUC: 'RUC',
  DNI: 'DNI'
};

export type ID_TYPE = (typeof ID_TYPE)[keyof typeof ID_TYPE]

}

export type GENDER = $Enums.GENDER

export const GENDER: typeof $Enums.GENDER

export type STATUS_USER = $Enums.STATUS_USER

export const STATUS_USER: typeof $Enums.STATUS_USER

export type ID_TYPE = $Enums.ID_TYPE

export const ID_TYPE: typeof $Enums.ID_TYPE

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordUser`: Exposes CRUD operations for the **PasswordUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordUsers
    * const passwordUsers = await prisma.passwordUser.findMany()
    * ```
    */
  get passwordUser(): Prisma.PasswordUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthUser`: Exposes CRUD operations for the **OAuthUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthUsers
    * const oAuthUsers = await prisma.oAuthUser.findMany()
    * ```
    */
  get oAuthUser(): Prisma.OAuthUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizer`: Exposes CRUD operations for the **Organizer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizers
    * const organizers = await prisma.organizer.findMany()
    * ```
    */
  get organizer(): Prisma.OrganizerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    PasswordUser: 'PasswordUser',
    OAuthUser: 'OAuthUser',
    Organizer: 'Organizer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "passwordUser" | "oAuthUser" | "organizer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PasswordUser: {
        payload: Prisma.$PasswordUserPayload<ExtArgs>
        fields: Prisma.PasswordUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>
          }
          findFirst: {
            args: Prisma.PasswordUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>
          }
          findMany: {
            args: Prisma.PasswordUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>[]
          }
          create: {
            args: Prisma.PasswordUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>
          }
          createMany: {
            args: Prisma.PasswordUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>[]
          }
          delete: {
            args: Prisma.PasswordUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>
          }
          update: {
            args: Prisma.PasswordUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>
          }
          deleteMany: {
            args: Prisma.PasswordUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>[]
          }
          upsert: {
            args: Prisma.PasswordUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordUserPayload>
          }
          aggregate: {
            args: Prisma.PasswordUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordUser>
          }
          groupBy: {
            args: Prisma.PasswordUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordUserCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordUserCountAggregateOutputType> | number
          }
        }
      }
      OAuthUser: {
        payload: Prisma.$OAuthUserPayload<ExtArgs>
        fields: Prisma.OAuthUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>
          }
          findFirst: {
            args: Prisma.OAuthUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>
          }
          findMany: {
            args: Prisma.OAuthUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>[]
          }
          create: {
            args: Prisma.OAuthUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>
          }
          createMany: {
            args: Prisma.OAuthUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>[]
          }
          delete: {
            args: Prisma.OAuthUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>
          }
          update: {
            args: Prisma.OAuthUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>
          }
          deleteMany: {
            args: Prisma.OAuthUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>[]
          }
          upsert: {
            args: Prisma.OAuthUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserPayload>
          }
          aggregate: {
            args: Prisma.OAuthUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthUser>
          }
          groupBy: {
            args: Prisma.OAuthUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthUserCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthUserCountAggregateOutputType> | number
          }
        }
      }
      Organizer: {
        payload: Prisma.$OrganizerPayload<ExtArgs>
        fields: Prisma.OrganizerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          findFirst: {
            args: Prisma.OrganizerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          findMany: {
            args: Prisma.OrganizerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>[]
          }
          create: {
            args: Prisma.OrganizerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          createMany: {
            args: Prisma.OrganizerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>[]
          }
          delete: {
            args: Prisma.OrganizerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          update: {
            args: Prisma.OrganizerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          deleteMany: {
            args: Prisma.OrganizerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>[]
          }
          upsert: {
            args: Prisma.OrganizerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          aggregate: {
            args: Prisma.OrganizerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizer>
          }
          groupBy: {
            args: Prisma.OrganizerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizerCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    passwordUser?: PasswordUserOmit
    oAuthUser?: OAuthUserOmit
    organizer?: OrganizerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    oauths: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauths?: boolean | UserCountOutputTypeCountOauthsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthUserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    userId: number | null
  }

  export type UserSumAggregateOutputType = {
    userId: bigint | null
  }

  export type UserMinAggregateOutputType = {
    userId: bigint | null
    name: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    birthdate: Date | null
    gender: $Enums.GENDER | null
    status: $Enums.STATUS_USER | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: bigint | null
    name: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    birthdate: Date | null
    gender: $Enums.GENDER | null
    status: $Enums.STATUS_USER | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    name: number
    lastName: number
    phone: number
    email: number
    birthdate: number
    gender: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    userId?: true
  }

  export type UserSumAggregateInputType = {
    userId?: true
  }

  export type UserMinAggregateInputType = {
    userId?: true
    name?: true
    lastName?: true
    phone?: true
    email?: true
    birthdate?: true
    gender?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    name?: true
    lastName?: true
    phone?: true
    email?: true
    birthdate?: true
    gender?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    name?: true
    lastName?: true
    phone?: true
    email?: true
    birthdate?: true
    gender?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: bigint
    name: string
    lastName: string
    phone: string | null
    email: string
    birthdate: Date | null
    gender: $Enums.GENDER | null
    status: $Enums.STATUS_USER
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    birthdate?: boolean
    gender?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean | User$passwordArgs<ExtArgs>
    oauths?: boolean | User$oauthsArgs<ExtArgs>
    organizer?: boolean | User$organizerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    birthdate?: boolean
    gender?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    birthdate?: boolean
    gender?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    name?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    birthdate?: boolean
    gender?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "name" | "lastName" | "phone" | "email" | "birthdate" | "gender" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    password?: boolean | User$passwordArgs<ExtArgs>
    oauths?: boolean | User$oauthsArgs<ExtArgs>
    organizer?: boolean | User$organizerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      password: Prisma.$PasswordUserPayload<ExtArgs> | null
      oauths: Prisma.$OAuthUserPayload<ExtArgs>[]
      organizer: Prisma.$OrganizerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: bigint
      name: string
      lastName: string
      phone: string | null
      email: string
      birthdate: Date | null
      gender: $Enums.GENDER | null
      status: $Enums.STATUS_USER
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    password<T extends User$passwordArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    oauths<T extends User$oauthsArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    organizer<T extends User$organizerArgs<ExtArgs> = {}>(args?: Subset<T, User$organizerArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'BigInt'>
    readonly name: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly birthdate: FieldRef<"User", 'DateTime'>
    readonly gender: FieldRef<"User", 'GENDER'>
    readonly status: FieldRef<"User", 'STATUS_USER'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.password
   */
  export type User$passwordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    where?: PasswordUserWhereInput
  }

  /**
   * User.oauths
   */
  export type User$oauthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    where?: OAuthUserWhereInput
    orderBy?: OAuthUserOrderByWithRelationInput | OAuthUserOrderByWithRelationInput[]
    cursor?: OAuthUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthUserScalarFieldEnum | OAuthUserScalarFieldEnum[]
  }

  /**
   * User.organizer
   */
  export type User$organizerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    where?: OrganizerWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PasswordUser
   */

  export type AggregatePasswordUser = {
    _count: PasswordUserCountAggregateOutputType | null
    _avg: PasswordUserAvgAggregateOutputType | null
    _sum: PasswordUserSumAggregateOutputType | null
    _min: PasswordUserMinAggregateOutputType | null
    _max: PasswordUserMaxAggregateOutputType | null
  }

  export type PasswordUserAvgAggregateOutputType = {
    userId: number | null
  }

  export type PasswordUserSumAggregateOutputType = {
    userId: bigint | null
  }

  export type PasswordUserMinAggregateOutputType = {
    userId: bigint | null
    hashedPassword: string | null
  }

  export type PasswordUserMaxAggregateOutputType = {
    userId: bigint | null
    hashedPassword: string | null
  }

  export type PasswordUserCountAggregateOutputType = {
    userId: number
    hashedPassword: number
    _all: number
  }


  export type PasswordUserAvgAggregateInputType = {
    userId?: true
  }

  export type PasswordUserSumAggregateInputType = {
    userId?: true
  }

  export type PasswordUserMinAggregateInputType = {
    userId?: true
    hashedPassword?: true
  }

  export type PasswordUserMaxAggregateInputType = {
    userId?: true
    hashedPassword?: true
  }

  export type PasswordUserCountAggregateInputType = {
    userId?: true
    hashedPassword?: true
    _all?: true
  }

  export type PasswordUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordUser to aggregate.
     */
    where?: PasswordUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordUsers to fetch.
     */
    orderBy?: PasswordUserOrderByWithRelationInput | PasswordUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordUsers
    **/
    _count?: true | PasswordUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PasswordUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PasswordUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordUserMaxAggregateInputType
  }

  export type GetPasswordUserAggregateType<T extends PasswordUserAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordUser[P]>
      : GetScalarType<T[P], AggregatePasswordUser[P]>
  }




  export type PasswordUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordUserWhereInput
    orderBy?: PasswordUserOrderByWithAggregationInput | PasswordUserOrderByWithAggregationInput[]
    by: PasswordUserScalarFieldEnum[] | PasswordUserScalarFieldEnum
    having?: PasswordUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordUserCountAggregateInputType | true
    _avg?: PasswordUserAvgAggregateInputType
    _sum?: PasswordUserSumAggregateInputType
    _min?: PasswordUserMinAggregateInputType
    _max?: PasswordUserMaxAggregateInputType
  }

  export type PasswordUserGroupByOutputType = {
    userId: bigint
    hashedPassword: string
    _count: PasswordUserCountAggregateOutputType | null
    _avg: PasswordUserAvgAggregateOutputType | null
    _sum: PasswordUserSumAggregateOutputType | null
    _min: PasswordUserMinAggregateOutputType | null
    _max: PasswordUserMaxAggregateOutputType | null
  }

  type GetPasswordUserGroupByPayload<T extends PasswordUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordUserGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordUserGroupByOutputType[P]>
        }
      >
    >


  export type PasswordUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    hashedPassword?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordUser"]>

  export type PasswordUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    hashedPassword?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordUser"]>

  export type PasswordUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    hashedPassword?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordUser"]>

  export type PasswordUserSelectScalar = {
    userId?: boolean
    hashedPassword?: boolean
  }

  export type PasswordUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "hashedPassword", ExtArgs["result"]["passwordUser"]>
  export type PasswordUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: bigint
      hashedPassword: string
    }, ExtArgs["result"]["passwordUser"]>
    composites: {}
  }

  type PasswordUserGetPayload<S extends boolean | null | undefined | PasswordUserDefaultArgs> = $Result.GetResult<Prisma.$PasswordUserPayload, S>

  type PasswordUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordUserCountAggregateInputType | true
    }

  export interface PasswordUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordUser'], meta: { name: 'PasswordUser' } }
    /**
     * Find zero or one PasswordUser that matches the filter.
     * @param {PasswordUserFindUniqueArgs} args - Arguments to find a PasswordUser
     * @example
     * // Get one PasswordUser
     * const passwordUser = await prisma.passwordUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordUserFindUniqueArgs>(args: SelectSubset<T, PasswordUserFindUniqueArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordUserFindUniqueOrThrowArgs} args - Arguments to find a PasswordUser
     * @example
     * // Get one PasswordUser
     * const passwordUser = await prisma.passwordUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordUserFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserFindFirstArgs} args - Arguments to find a PasswordUser
     * @example
     * // Get one PasswordUser
     * const passwordUser = await prisma.passwordUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordUserFindFirstArgs>(args?: SelectSubset<T, PasswordUserFindFirstArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserFindFirstOrThrowArgs} args - Arguments to find a PasswordUser
     * @example
     * // Get one PasswordUser
     * const passwordUser = await prisma.passwordUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordUserFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordUsers
     * const passwordUsers = await prisma.passwordUser.findMany()
     * 
     * // Get first 10 PasswordUsers
     * const passwordUsers = await prisma.passwordUser.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const passwordUserWithUserIdOnly = await prisma.passwordUser.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends PasswordUserFindManyArgs>(args?: SelectSubset<T, PasswordUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordUser.
     * @param {PasswordUserCreateArgs} args - Arguments to create a PasswordUser.
     * @example
     * // Create one PasswordUser
     * const PasswordUser = await prisma.passwordUser.create({
     *   data: {
     *     // ... data to create a PasswordUser
     *   }
     * })
     * 
     */
    create<T extends PasswordUserCreateArgs>(args: SelectSubset<T, PasswordUserCreateArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordUsers.
     * @param {PasswordUserCreateManyArgs} args - Arguments to create many PasswordUsers.
     * @example
     * // Create many PasswordUsers
     * const passwordUser = await prisma.passwordUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordUserCreateManyArgs>(args?: SelectSubset<T, PasswordUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordUsers and returns the data saved in the database.
     * @param {PasswordUserCreateManyAndReturnArgs} args - Arguments to create many PasswordUsers.
     * @example
     * // Create many PasswordUsers
     * const passwordUser = await prisma.passwordUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordUsers and only return the `userId`
     * const passwordUserWithUserIdOnly = await prisma.passwordUser.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordUserCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordUser.
     * @param {PasswordUserDeleteArgs} args - Arguments to delete one PasswordUser.
     * @example
     * // Delete one PasswordUser
     * const PasswordUser = await prisma.passwordUser.delete({
     *   where: {
     *     // ... filter to delete one PasswordUser
     *   }
     * })
     * 
     */
    delete<T extends PasswordUserDeleteArgs>(args: SelectSubset<T, PasswordUserDeleteArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordUser.
     * @param {PasswordUserUpdateArgs} args - Arguments to update one PasswordUser.
     * @example
     * // Update one PasswordUser
     * const passwordUser = await prisma.passwordUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordUserUpdateArgs>(args: SelectSubset<T, PasswordUserUpdateArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordUsers.
     * @param {PasswordUserDeleteManyArgs} args - Arguments to filter PasswordUsers to delete.
     * @example
     * // Delete a few PasswordUsers
     * const { count } = await prisma.passwordUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordUserDeleteManyArgs>(args?: SelectSubset<T, PasswordUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordUsers
     * const passwordUser = await prisma.passwordUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordUserUpdateManyArgs>(args: SelectSubset<T, PasswordUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordUsers and returns the data updated in the database.
     * @param {PasswordUserUpdateManyAndReturnArgs} args - Arguments to update many PasswordUsers.
     * @example
     * // Update many PasswordUsers
     * const passwordUser = await prisma.passwordUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordUsers and only return the `userId`
     * const passwordUserWithUserIdOnly = await prisma.passwordUser.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordUserUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordUser.
     * @param {PasswordUserUpsertArgs} args - Arguments to update or create a PasswordUser.
     * @example
     * // Update or create a PasswordUser
     * const passwordUser = await prisma.passwordUser.upsert({
     *   create: {
     *     // ... data to create a PasswordUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordUser we want to update
     *   }
     * })
     */
    upsert<T extends PasswordUserUpsertArgs>(args: SelectSubset<T, PasswordUserUpsertArgs<ExtArgs>>): Prisma__PasswordUserClient<$Result.GetResult<Prisma.$PasswordUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserCountArgs} args - Arguments to filter PasswordUsers to count.
     * @example
     * // Count the number of PasswordUsers
     * const count = await prisma.passwordUser.count({
     *   where: {
     *     // ... the filter for the PasswordUsers we want to count
     *   }
     * })
    **/
    count<T extends PasswordUserCountArgs>(
      args?: Subset<T, PasswordUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordUserAggregateArgs>(args: Subset<T, PasswordUserAggregateArgs>): Prisma.PrismaPromise<GetPasswordUserAggregateType<T>>

    /**
     * Group by PasswordUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordUserGroupByArgs['orderBy'] }
        : { orderBy?: PasswordUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordUser model
   */
  readonly fields: PasswordUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordUser model
   */
  interface PasswordUserFieldRefs {
    readonly userId: FieldRef<"PasswordUser", 'BigInt'>
    readonly hashedPassword: FieldRef<"PasswordUser", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PasswordUser findUnique
   */
  export type PasswordUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * Filter, which PasswordUser to fetch.
     */
    where: PasswordUserWhereUniqueInput
  }

  /**
   * PasswordUser findUniqueOrThrow
   */
  export type PasswordUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * Filter, which PasswordUser to fetch.
     */
    where: PasswordUserWhereUniqueInput
  }

  /**
   * PasswordUser findFirst
   */
  export type PasswordUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * Filter, which PasswordUser to fetch.
     */
    where?: PasswordUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordUsers to fetch.
     */
    orderBy?: PasswordUserOrderByWithRelationInput | PasswordUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordUsers.
     */
    cursor?: PasswordUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordUsers.
     */
    distinct?: PasswordUserScalarFieldEnum | PasswordUserScalarFieldEnum[]
  }

  /**
   * PasswordUser findFirstOrThrow
   */
  export type PasswordUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * Filter, which PasswordUser to fetch.
     */
    where?: PasswordUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordUsers to fetch.
     */
    orderBy?: PasswordUserOrderByWithRelationInput | PasswordUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordUsers.
     */
    cursor?: PasswordUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordUsers.
     */
    distinct?: PasswordUserScalarFieldEnum | PasswordUserScalarFieldEnum[]
  }

  /**
   * PasswordUser findMany
   */
  export type PasswordUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * Filter, which PasswordUsers to fetch.
     */
    where?: PasswordUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordUsers to fetch.
     */
    orderBy?: PasswordUserOrderByWithRelationInput | PasswordUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordUsers.
     */
    cursor?: PasswordUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordUsers.
     */
    skip?: number
    distinct?: PasswordUserScalarFieldEnum | PasswordUserScalarFieldEnum[]
  }

  /**
   * PasswordUser create
   */
  export type PasswordUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordUser.
     */
    data: XOR<PasswordUserCreateInput, PasswordUserUncheckedCreateInput>
  }

  /**
   * PasswordUser createMany
   */
  export type PasswordUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordUsers.
     */
    data: PasswordUserCreateManyInput | PasswordUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordUser createManyAndReturn
   */
  export type PasswordUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordUsers.
     */
    data: PasswordUserCreateManyInput | PasswordUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordUser update
   */
  export type PasswordUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordUser.
     */
    data: XOR<PasswordUserUpdateInput, PasswordUserUncheckedUpdateInput>
    /**
     * Choose, which PasswordUser to update.
     */
    where: PasswordUserWhereUniqueInput
  }

  /**
   * PasswordUser updateMany
   */
  export type PasswordUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordUsers.
     */
    data: XOR<PasswordUserUpdateManyMutationInput, PasswordUserUncheckedUpdateManyInput>
    /**
     * Filter which PasswordUsers to update
     */
    where?: PasswordUserWhereInput
    /**
     * Limit how many PasswordUsers to update.
     */
    limit?: number
  }

  /**
   * PasswordUser updateManyAndReturn
   */
  export type PasswordUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * The data used to update PasswordUsers.
     */
    data: XOR<PasswordUserUpdateManyMutationInput, PasswordUserUncheckedUpdateManyInput>
    /**
     * Filter which PasswordUsers to update
     */
    where?: PasswordUserWhereInput
    /**
     * Limit how many PasswordUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordUser upsert
   */
  export type PasswordUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordUser to update in case it exists.
     */
    where: PasswordUserWhereUniqueInput
    /**
     * In case the PasswordUser found by the `where` argument doesn't exist, create a new PasswordUser with this data.
     */
    create: XOR<PasswordUserCreateInput, PasswordUserUncheckedCreateInput>
    /**
     * In case the PasswordUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordUserUpdateInput, PasswordUserUncheckedUpdateInput>
  }

  /**
   * PasswordUser delete
   */
  export type PasswordUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
    /**
     * Filter which PasswordUser to delete.
     */
    where: PasswordUserWhereUniqueInput
  }

  /**
   * PasswordUser deleteMany
   */
  export type PasswordUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordUsers to delete
     */
    where?: PasswordUserWhereInput
    /**
     * Limit how many PasswordUsers to delete.
     */
    limit?: number
  }

  /**
   * PasswordUser without action
   */
  export type PasswordUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordUser
     */
    select?: PasswordUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordUser
     */
    omit?: PasswordUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordUserInclude<ExtArgs> | null
  }


  /**
   * Model OAuthUser
   */

  export type AggregateOAuthUser = {
    _count: OAuthUserCountAggregateOutputType | null
    _avg: OAuthUserAvgAggregateOutputType | null
    _sum: OAuthUserSumAggregateOutputType | null
    _min: OAuthUserMinAggregateOutputType | null
    _max: OAuthUserMaxAggregateOutputType | null
  }

  export type OAuthUserAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type OAuthUserSumAggregateOutputType = {
    id: number | null
    userId: bigint | null
  }

  export type OAuthUserMinAggregateOutputType = {
    id: number | null
    userId: bigint | null
    provider: string | null
    providerUserId: string | null
  }

  export type OAuthUserMaxAggregateOutputType = {
    id: number | null
    userId: bigint | null
    provider: string | null
    providerUserId: string | null
  }

  export type OAuthUserCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerUserId: number
    _all: number
  }


  export type OAuthUserAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type OAuthUserSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type OAuthUserMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerUserId?: true
  }

  export type OAuthUserMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerUserId?: true
  }

  export type OAuthUserCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerUserId?: true
    _all?: true
  }

  export type OAuthUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthUser to aggregate.
     */
    where?: OAuthUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUsers to fetch.
     */
    orderBy?: OAuthUserOrderByWithRelationInput | OAuthUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthUsers
    **/
    _count?: true | OAuthUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OAuthUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OAuthUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthUserMaxAggregateInputType
  }

  export type GetOAuthUserAggregateType<T extends OAuthUserAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthUser[P]>
      : GetScalarType<T[P], AggregateOAuthUser[P]>
  }




  export type OAuthUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthUserWhereInput
    orderBy?: OAuthUserOrderByWithAggregationInput | OAuthUserOrderByWithAggregationInput[]
    by: OAuthUserScalarFieldEnum[] | OAuthUserScalarFieldEnum
    having?: OAuthUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthUserCountAggregateInputType | true
    _avg?: OAuthUserAvgAggregateInputType
    _sum?: OAuthUserSumAggregateInputType
    _min?: OAuthUserMinAggregateInputType
    _max?: OAuthUserMaxAggregateInputType
  }

  export type OAuthUserGroupByOutputType = {
    id: number
    userId: bigint
    provider: string
    providerUserId: string
    _count: OAuthUserCountAggregateOutputType | null
    _avg: OAuthUserAvgAggregateOutputType | null
    _sum: OAuthUserSumAggregateOutputType | null
    _min: OAuthUserMinAggregateOutputType | null
    _max: OAuthUserMaxAggregateOutputType | null
  }

  type GetOAuthUserGroupByPayload<T extends OAuthUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthUserGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthUserGroupByOutputType[P]>
        }
      >
    >


  export type OAuthUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthUser"]>

  export type OAuthUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthUser"]>

  export type OAuthUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthUser"]>

  export type OAuthUserSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
  }

  export type OAuthUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerUserId", ExtArgs["result"]["oAuthUser"]>
  export type OAuthUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: bigint
      provider: string
      providerUserId: string
    }, ExtArgs["result"]["oAuthUser"]>
    composites: {}
  }

  type OAuthUserGetPayload<S extends boolean | null | undefined | OAuthUserDefaultArgs> = $Result.GetResult<Prisma.$OAuthUserPayload, S>

  type OAuthUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthUserCountAggregateInputType | true
    }

  export interface OAuthUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthUser'], meta: { name: 'OAuthUser' } }
    /**
     * Find zero or one OAuthUser that matches the filter.
     * @param {OAuthUserFindUniqueArgs} args - Arguments to find a OAuthUser
     * @example
     * // Get one OAuthUser
     * const oAuthUser = await prisma.oAuthUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthUserFindUniqueArgs>(args: SelectSubset<T, OAuthUserFindUniqueArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthUserFindUniqueOrThrowArgs} args - Arguments to find a OAuthUser
     * @example
     * // Get one OAuthUser
     * const oAuthUser = await prisma.oAuthUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthUserFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserFindFirstArgs} args - Arguments to find a OAuthUser
     * @example
     * // Get one OAuthUser
     * const oAuthUser = await prisma.oAuthUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthUserFindFirstArgs>(args?: SelectSubset<T, OAuthUserFindFirstArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserFindFirstOrThrowArgs} args - Arguments to find a OAuthUser
     * @example
     * // Get one OAuthUser
     * const oAuthUser = await prisma.oAuthUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthUserFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthUsers
     * const oAuthUsers = await prisma.oAuthUser.findMany()
     * 
     * // Get first 10 OAuthUsers
     * const oAuthUsers = await prisma.oAuthUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthUserWithIdOnly = await prisma.oAuthUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthUserFindManyArgs>(args?: SelectSubset<T, OAuthUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthUser.
     * @param {OAuthUserCreateArgs} args - Arguments to create a OAuthUser.
     * @example
     * // Create one OAuthUser
     * const OAuthUser = await prisma.oAuthUser.create({
     *   data: {
     *     // ... data to create a OAuthUser
     *   }
     * })
     * 
     */
    create<T extends OAuthUserCreateArgs>(args: SelectSubset<T, OAuthUserCreateArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthUsers.
     * @param {OAuthUserCreateManyArgs} args - Arguments to create many OAuthUsers.
     * @example
     * // Create many OAuthUsers
     * const oAuthUser = await prisma.oAuthUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthUserCreateManyArgs>(args?: SelectSubset<T, OAuthUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthUsers and returns the data saved in the database.
     * @param {OAuthUserCreateManyAndReturnArgs} args - Arguments to create many OAuthUsers.
     * @example
     * // Create many OAuthUsers
     * const oAuthUser = await prisma.oAuthUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthUsers and only return the `id`
     * const oAuthUserWithIdOnly = await prisma.oAuthUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthUserCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthUser.
     * @param {OAuthUserDeleteArgs} args - Arguments to delete one OAuthUser.
     * @example
     * // Delete one OAuthUser
     * const OAuthUser = await prisma.oAuthUser.delete({
     *   where: {
     *     // ... filter to delete one OAuthUser
     *   }
     * })
     * 
     */
    delete<T extends OAuthUserDeleteArgs>(args: SelectSubset<T, OAuthUserDeleteArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthUser.
     * @param {OAuthUserUpdateArgs} args - Arguments to update one OAuthUser.
     * @example
     * // Update one OAuthUser
     * const oAuthUser = await prisma.oAuthUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthUserUpdateArgs>(args: SelectSubset<T, OAuthUserUpdateArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthUsers.
     * @param {OAuthUserDeleteManyArgs} args - Arguments to filter OAuthUsers to delete.
     * @example
     * // Delete a few OAuthUsers
     * const { count } = await prisma.oAuthUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthUserDeleteManyArgs>(args?: SelectSubset<T, OAuthUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthUsers
     * const oAuthUser = await prisma.oAuthUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthUserUpdateManyArgs>(args: SelectSubset<T, OAuthUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthUsers and returns the data updated in the database.
     * @param {OAuthUserUpdateManyAndReturnArgs} args - Arguments to update many OAuthUsers.
     * @example
     * // Update many OAuthUsers
     * const oAuthUser = await prisma.oAuthUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthUsers and only return the `id`
     * const oAuthUserWithIdOnly = await prisma.oAuthUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthUserUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthUser.
     * @param {OAuthUserUpsertArgs} args - Arguments to update or create a OAuthUser.
     * @example
     * // Update or create a OAuthUser
     * const oAuthUser = await prisma.oAuthUser.upsert({
     *   create: {
     *     // ... data to create a OAuthUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthUser we want to update
     *   }
     * })
     */
    upsert<T extends OAuthUserUpsertArgs>(args: SelectSubset<T, OAuthUserUpsertArgs<ExtArgs>>): Prisma__OAuthUserClient<$Result.GetResult<Prisma.$OAuthUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserCountArgs} args - Arguments to filter OAuthUsers to count.
     * @example
     * // Count the number of OAuthUsers
     * const count = await prisma.oAuthUser.count({
     *   where: {
     *     // ... the filter for the OAuthUsers we want to count
     *   }
     * })
    **/
    count<T extends OAuthUserCountArgs>(
      args?: Subset<T, OAuthUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthUserAggregateArgs>(args: Subset<T, OAuthUserAggregateArgs>): Prisma.PrismaPromise<GetOAuthUserAggregateType<T>>

    /**
     * Group by OAuthUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthUserGroupByArgs['orderBy'] }
        : { orderBy?: OAuthUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthUser model
   */
  readonly fields: OAuthUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthUser model
   */
  interface OAuthUserFieldRefs {
    readonly id: FieldRef<"OAuthUser", 'Int'>
    readonly userId: FieldRef<"OAuthUser", 'BigInt'>
    readonly provider: FieldRef<"OAuthUser", 'String'>
    readonly providerUserId: FieldRef<"OAuthUser", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OAuthUser findUnique
   */
  export type OAuthUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUser to fetch.
     */
    where: OAuthUserWhereUniqueInput
  }

  /**
   * OAuthUser findUniqueOrThrow
   */
  export type OAuthUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUser to fetch.
     */
    where: OAuthUserWhereUniqueInput
  }

  /**
   * OAuthUser findFirst
   */
  export type OAuthUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUser to fetch.
     */
    where?: OAuthUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUsers to fetch.
     */
    orderBy?: OAuthUserOrderByWithRelationInput | OAuthUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthUsers.
     */
    cursor?: OAuthUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthUsers.
     */
    distinct?: OAuthUserScalarFieldEnum | OAuthUserScalarFieldEnum[]
  }

  /**
   * OAuthUser findFirstOrThrow
   */
  export type OAuthUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUser to fetch.
     */
    where?: OAuthUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUsers to fetch.
     */
    orderBy?: OAuthUserOrderByWithRelationInput | OAuthUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthUsers.
     */
    cursor?: OAuthUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthUsers.
     */
    distinct?: OAuthUserScalarFieldEnum | OAuthUserScalarFieldEnum[]
  }

  /**
   * OAuthUser findMany
   */
  export type OAuthUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUsers to fetch.
     */
    where?: OAuthUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUsers to fetch.
     */
    orderBy?: OAuthUserOrderByWithRelationInput | OAuthUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthUsers.
     */
    cursor?: OAuthUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUsers.
     */
    skip?: number
    distinct?: OAuthUserScalarFieldEnum | OAuthUserScalarFieldEnum[]
  }

  /**
   * OAuthUser create
   */
  export type OAuthUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthUser.
     */
    data: XOR<OAuthUserCreateInput, OAuthUserUncheckedCreateInput>
  }

  /**
   * OAuthUser createMany
   */
  export type OAuthUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthUsers.
     */
    data: OAuthUserCreateManyInput | OAuthUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthUser createManyAndReturn
   */
  export type OAuthUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthUsers.
     */
    data: OAuthUserCreateManyInput | OAuthUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthUser update
   */
  export type OAuthUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthUser.
     */
    data: XOR<OAuthUserUpdateInput, OAuthUserUncheckedUpdateInput>
    /**
     * Choose, which OAuthUser to update.
     */
    where: OAuthUserWhereUniqueInput
  }

  /**
   * OAuthUser updateMany
   */
  export type OAuthUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthUsers.
     */
    data: XOR<OAuthUserUpdateManyMutationInput, OAuthUserUncheckedUpdateManyInput>
    /**
     * Filter which OAuthUsers to update
     */
    where?: OAuthUserWhereInput
    /**
     * Limit how many OAuthUsers to update.
     */
    limit?: number
  }

  /**
   * OAuthUser updateManyAndReturn
   */
  export type OAuthUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * The data used to update OAuthUsers.
     */
    data: XOR<OAuthUserUpdateManyMutationInput, OAuthUserUncheckedUpdateManyInput>
    /**
     * Filter which OAuthUsers to update
     */
    where?: OAuthUserWhereInput
    /**
     * Limit how many OAuthUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthUser upsert
   */
  export type OAuthUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthUser to update in case it exists.
     */
    where: OAuthUserWhereUniqueInput
    /**
     * In case the OAuthUser found by the `where` argument doesn't exist, create a new OAuthUser with this data.
     */
    create: XOR<OAuthUserCreateInput, OAuthUserUncheckedCreateInput>
    /**
     * In case the OAuthUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthUserUpdateInput, OAuthUserUncheckedUpdateInput>
  }

  /**
   * OAuthUser delete
   */
  export type OAuthUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
    /**
     * Filter which OAuthUser to delete.
     */
    where: OAuthUserWhereUniqueInput
  }

  /**
   * OAuthUser deleteMany
   */
  export type OAuthUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthUsers to delete
     */
    where?: OAuthUserWhereInput
    /**
     * Limit how many OAuthUsers to delete.
     */
    limit?: number
  }

  /**
   * OAuthUser without action
   */
  export type OAuthUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUser
     */
    select?: OAuthUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUser
     */
    omit?: OAuthUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserInclude<ExtArgs> | null
  }


  /**
   * Model Organizer
   */

  export type AggregateOrganizer = {
    _count: OrganizerCountAggregateOutputType | null
    _avg: OrganizerAvgAggregateOutputType | null
    _sum: OrganizerSumAggregateOutputType | null
    _min: OrganizerMinAggregateOutputType | null
    _max: OrganizerMaxAggregateOutputType | null
  }

  export type OrganizerAvgAggregateOutputType = {
    organizerId: number | null
    userId: number | null
  }

  export type OrganizerSumAggregateOutputType = {
    organizerId: bigint | null
    userId: bigint | null
  }

  export type OrganizerMinAggregateOutputType = {
    organizerId: bigint | null
    userId: bigint | null
    companyName: string | null
    idType: $Enums.ID_TYPE | null
    idNumber: string | null
  }

  export type OrganizerMaxAggregateOutputType = {
    organizerId: bigint | null
    userId: bigint | null
    companyName: string | null
    idType: $Enums.ID_TYPE | null
    idNumber: string | null
  }

  export type OrganizerCountAggregateOutputType = {
    organizerId: number
    userId: number
    companyName: number
    idType: number
    idNumber: number
    _all: number
  }


  export type OrganizerAvgAggregateInputType = {
    organizerId?: true
    userId?: true
  }

  export type OrganizerSumAggregateInputType = {
    organizerId?: true
    userId?: true
  }

  export type OrganizerMinAggregateInputType = {
    organizerId?: true
    userId?: true
    companyName?: true
    idType?: true
    idNumber?: true
  }

  export type OrganizerMaxAggregateInputType = {
    organizerId?: true
    userId?: true
    companyName?: true
    idType?: true
    idNumber?: true
  }

  export type OrganizerCountAggregateInputType = {
    organizerId?: true
    userId?: true
    companyName?: true
    idType?: true
    idNumber?: true
    _all?: true
  }

  export type OrganizerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizer to aggregate.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizers
    **/
    _count?: true | OrganizerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizerMaxAggregateInputType
  }

  export type GetOrganizerAggregateType<T extends OrganizerAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizer[P]>
      : GetScalarType<T[P], AggregateOrganizer[P]>
  }




  export type OrganizerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizerWhereInput
    orderBy?: OrganizerOrderByWithAggregationInput | OrganizerOrderByWithAggregationInput[]
    by: OrganizerScalarFieldEnum[] | OrganizerScalarFieldEnum
    having?: OrganizerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizerCountAggregateInputType | true
    _avg?: OrganizerAvgAggregateInputType
    _sum?: OrganizerSumAggregateInputType
    _min?: OrganizerMinAggregateInputType
    _max?: OrganizerMaxAggregateInputType
  }

  export type OrganizerGroupByOutputType = {
    organizerId: bigint
    userId: bigint
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
    _count: OrganizerCountAggregateOutputType | null
    _avg: OrganizerAvgAggregateOutputType | null
    _sum: OrganizerSumAggregateOutputType | null
    _min: OrganizerMinAggregateOutputType | null
    _max: OrganizerMaxAggregateOutputType | null
  }

  type GetOrganizerGroupByPayload<T extends OrganizerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizerGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizerGroupByOutputType[P]>
        }
      >
    >


  export type OrganizerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizerId?: boolean
    userId?: boolean
    companyName?: boolean
    idType?: boolean
    idNumber?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizer"]>

  export type OrganizerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizerId?: boolean
    userId?: boolean
    companyName?: boolean
    idType?: boolean
    idNumber?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizer"]>

  export type OrganizerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizerId?: boolean
    userId?: boolean
    companyName?: boolean
    idType?: boolean
    idNumber?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizer"]>

  export type OrganizerSelectScalar = {
    organizerId?: boolean
    userId?: boolean
    companyName?: boolean
    idType?: boolean
    idNumber?: boolean
  }

  export type OrganizerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"organizerId" | "userId" | "companyName" | "idType" | "idNumber", ExtArgs["result"]["organizer"]>
  export type OrganizerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrganizerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrganizerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrganizerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organizer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      organizerId: bigint
      userId: bigint
      companyName: string
      idType: $Enums.ID_TYPE
      idNumber: string
    }, ExtArgs["result"]["organizer"]>
    composites: {}
  }

  type OrganizerGetPayload<S extends boolean | null | undefined | OrganizerDefaultArgs> = $Result.GetResult<Prisma.$OrganizerPayload, S>

  type OrganizerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizerCountAggregateInputType | true
    }

  export interface OrganizerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organizer'], meta: { name: 'Organizer' } }
    /**
     * Find zero or one Organizer that matches the filter.
     * @param {OrganizerFindUniqueArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizerFindUniqueArgs>(args: SelectSubset<T, OrganizerFindUniqueArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organizer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizerFindUniqueOrThrowArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizerFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organizer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerFindFirstArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizerFindFirstArgs>(args?: SelectSubset<T, OrganizerFindFirstArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organizer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerFindFirstOrThrowArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizerFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizers
     * const organizers = await prisma.organizer.findMany()
     * 
     * // Get first 10 Organizers
     * const organizers = await prisma.organizer.findMany({ take: 10 })
     * 
     * // Only select the `organizerId`
     * const organizerWithOrganizerIdOnly = await prisma.organizer.findMany({ select: { organizerId: true } })
     * 
     */
    findMany<T extends OrganizerFindManyArgs>(args?: SelectSubset<T, OrganizerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organizer.
     * @param {OrganizerCreateArgs} args - Arguments to create a Organizer.
     * @example
     * // Create one Organizer
     * const Organizer = await prisma.organizer.create({
     *   data: {
     *     // ... data to create a Organizer
     *   }
     * })
     * 
     */
    create<T extends OrganizerCreateArgs>(args: SelectSubset<T, OrganizerCreateArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizers.
     * @param {OrganizerCreateManyArgs} args - Arguments to create many Organizers.
     * @example
     * // Create many Organizers
     * const organizer = await prisma.organizer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizerCreateManyArgs>(args?: SelectSubset<T, OrganizerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizers and returns the data saved in the database.
     * @param {OrganizerCreateManyAndReturnArgs} args - Arguments to create many Organizers.
     * @example
     * // Create many Organizers
     * const organizer = await prisma.organizer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizers and only return the `organizerId`
     * const organizerWithOrganizerIdOnly = await prisma.organizer.createManyAndReturn({
     *   select: { organizerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizerCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organizer.
     * @param {OrganizerDeleteArgs} args - Arguments to delete one Organizer.
     * @example
     * // Delete one Organizer
     * const Organizer = await prisma.organizer.delete({
     *   where: {
     *     // ... filter to delete one Organizer
     *   }
     * })
     * 
     */
    delete<T extends OrganizerDeleteArgs>(args: SelectSubset<T, OrganizerDeleteArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organizer.
     * @param {OrganizerUpdateArgs} args - Arguments to update one Organizer.
     * @example
     * // Update one Organizer
     * const organizer = await prisma.organizer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizerUpdateArgs>(args: SelectSubset<T, OrganizerUpdateArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizers.
     * @param {OrganizerDeleteManyArgs} args - Arguments to filter Organizers to delete.
     * @example
     * // Delete a few Organizers
     * const { count } = await prisma.organizer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizerDeleteManyArgs>(args?: SelectSubset<T, OrganizerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizers
     * const organizer = await prisma.organizer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizerUpdateManyArgs>(args: SelectSubset<T, OrganizerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizers and returns the data updated in the database.
     * @param {OrganizerUpdateManyAndReturnArgs} args - Arguments to update many Organizers.
     * @example
     * // Update many Organizers
     * const organizer = await prisma.organizer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizers and only return the `organizerId`
     * const organizerWithOrganizerIdOnly = await prisma.organizer.updateManyAndReturn({
     *   select: { organizerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizerUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organizer.
     * @param {OrganizerUpsertArgs} args - Arguments to update or create a Organizer.
     * @example
     * // Update or create a Organizer
     * const organizer = await prisma.organizer.upsert({
     *   create: {
     *     // ... data to create a Organizer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organizer we want to update
     *   }
     * })
     */
    upsert<T extends OrganizerUpsertArgs>(args: SelectSubset<T, OrganizerUpsertArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerCountArgs} args - Arguments to filter Organizers to count.
     * @example
     * // Count the number of Organizers
     * const count = await prisma.organizer.count({
     *   where: {
     *     // ... the filter for the Organizers we want to count
     *   }
     * })
    **/
    count<T extends OrganizerCountArgs>(
      args?: Subset<T, OrganizerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organizer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizerAggregateArgs>(args: Subset<T, OrganizerAggregateArgs>): Prisma.PrismaPromise<GetOrganizerAggregateType<T>>

    /**
     * Group by Organizer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizerGroupByArgs['orderBy'] }
        : { orderBy?: OrganizerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organizer model
   */
  readonly fields: OrganizerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organizer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organizer model
   */
  interface OrganizerFieldRefs {
    readonly organizerId: FieldRef<"Organizer", 'BigInt'>
    readonly userId: FieldRef<"Organizer", 'BigInt'>
    readonly companyName: FieldRef<"Organizer", 'String'>
    readonly idType: FieldRef<"Organizer", 'ID_TYPE'>
    readonly idNumber: FieldRef<"Organizer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Organizer findUnique
   */
  export type OrganizerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer findUniqueOrThrow
   */
  export type OrganizerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer findFirst
   */
  export type OrganizerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizers.
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizers.
     */
    distinct?: OrganizerScalarFieldEnum | OrganizerScalarFieldEnum[]
  }

  /**
   * Organizer findFirstOrThrow
   */
  export type OrganizerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizers.
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizers.
     */
    distinct?: OrganizerScalarFieldEnum | OrganizerScalarFieldEnum[]
  }

  /**
   * Organizer findMany
   */
  export type OrganizerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizers to fetch.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizers.
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    distinct?: OrganizerScalarFieldEnum | OrganizerScalarFieldEnum[]
  }

  /**
   * Organizer create
   */
  export type OrganizerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * The data needed to create a Organizer.
     */
    data: XOR<OrganizerCreateInput, OrganizerUncheckedCreateInput>
  }

  /**
   * Organizer createMany
   */
  export type OrganizerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizers.
     */
    data: OrganizerCreateManyInput | OrganizerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organizer createManyAndReturn
   */
  export type OrganizerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * The data used to create many Organizers.
     */
    data: OrganizerCreateManyInput | OrganizerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organizer update
   */
  export type OrganizerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * The data needed to update a Organizer.
     */
    data: XOR<OrganizerUpdateInput, OrganizerUncheckedUpdateInput>
    /**
     * Choose, which Organizer to update.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer updateMany
   */
  export type OrganizerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizers.
     */
    data: XOR<OrganizerUpdateManyMutationInput, OrganizerUncheckedUpdateManyInput>
    /**
     * Filter which Organizers to update
     */
    where?: OrganizerWhereInput
    /**
     * Limit how many Organizers to update.
     */
    limit?: number
  }

  /**
   * Organizer updateManyAndReturn
   */
  export type OrganizerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * The data used to update Organizers.
     */
    data: XOR<OrganizerUpdateManyMutationInput, OrganizerUncheckedUpdateManyInput>
    /**
     * Filter which Organizers to update
     */
    where?: OrganizerWhereInput
    /**
     * Limit how many Organizers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organizer upsert
   */
  export type OrganizerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * The filter to search for the Organizer to update in case it exists.
     */
    where: OrganizerWhereUniqueInput
    /**
     * In case the Organizer found by the `where` argument doesn't exist, create a new Organizer with this data.
     */
    create: XOR<OrganizerCreateInput, OrganizerUncheckedCreateInput>
    /**
     * In case the Organizer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizerUpdateInput, OrganizerUncheckedUpdateInput>
  }

  /**
   * Organizer delete
   */
  export type OrganizerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter which Organizer to delete.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer deleteMany
   */
  export type OrganizerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizers to delete
     */
    where?: OrganizerWhereInput
    /**
     * Limit how many Organizers to delete.
     */
    limit?: number
  }

  /**
   * Organizer without action
   */
  export type OrganizerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    name: 'name',
    lastName: 'lastName',
    phone: 'phone',
    email: 'email',
    birthdate: 'birthdate',
    gender: 'gender',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PasswordUserScalarFieldEnum: {
    userId: 'userId',
    hashedPassword: 'hashedPassword'
  };

  export type PasswordUserScalarFieldEnum = (typeof PasswordUserScalarFieldEnum)[keyof typeof PasswordUserScalarFieldEnum]


  export const OAuthUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerUserId: 'providerUserId'
  };

  export type OAuthUserScalarFieldEnum = (typeof OAuthUserScalarFieldEnum)[keyof typeof OAuthUserScalarFieldEnum]


  export const OrganizerScalarFieldEnum: {
    organizerId: 'organizerId',
    userId: 'userId',
    companyName: 'companyName',
    idType: 'idType',
    idNumber: 'idNumber'
  };

  export type OrganizerScalarFieldEnum = (typeof OrganizerScalarFieldEnum)[keyof typeof OrganizerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'GENDER'
   */
  export type EnumGENDERFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GENDER'>
    


  /**
   * Reference to a field of type 'GENDER[]'
   */
  export type ListEnumGENDERFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GENDER[]'>
    


  /**
   * Reference to a field of type 'STATUS_USER'
   */
  export type EnumSTATUS_USERFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'STATUS_USER'>
    


  /**
   * Reference to a field of type 'STATUS_USER[]'
   */
  export type ListEnumSTATUS_USERFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'STATUS_USER[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ID_TYPE'
   */
  export type EnumID_TYPEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ID_TYPE'>
    


  /**
   * Reference to a field of type 'ID_TYPE[]'
   */
  export type ListEnumID_TYPEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ID_TYPE[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: BigIntFilter<"User"> | bigint | number
    name?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    birthdate?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: EnumGENDERNullableFilter<"User"> | $Enums.GENDER | null
    status?: EnumSTATUS_USERFilter<"User"> | $Enums.STATUS_USER
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: XOR<PasswordUserNullableScalarRelationFilter, PasswordUserWhereInput> | null
    oauths?: OAuthUserListRelationFilter
    organizer?: XOR<OrganizerNullableScalarRelationFilter, OrganizerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    name?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrder
    birthdate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: PasswordUserOrderByWithRelationInput
    oauths?: OAuthUserOrderByRelationAggregateInput
    organizer?: OrganizerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: bigint | number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    birthdate?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: EnumGENDERNullableFilter<"User"> | $Enums.GENDER | null
    status?: EnumSTATUS_USERFilter<"User"> | $Enums.STATUS_USER
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: XOR<PasswordUserNullableScalarRelationFilter, PasswordUserWhereInput> | null
    oauths?: OAuthUserListRelationFilter
    organizer?: XOR<OrganizerNullableScalarRelationFilter, OrganizerWhereInput> | null
  }, "userId" | "email">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    name?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrder
    birthdate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: BigIntWithAggregatesFilter<"User"> | bigint | number
    name?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    birthdate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    gender?: EnumGENDERNullableWithAggregatesFilter<"User"> | $Enums.GENDER | null
    status?: EnumSTATUS_USERWithAggregatesFilter<"User"> | $Enums.STATUS_USER
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PasswordUserWhereInput = {
    AND?: PasswordUserWhereInput | PasswordUserWhereInput[]
    OR?: PasswordUserWhereInput[]
    NOT?: PasswordUserWhereInput | PasswordUserWhereInput[]
    userId?: BigIntFilter<"PasswordUser"> | bigint | number
    hashedPassword?: StringFilter<"PasswordUser"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordUserOrderByWithRelationInput = {
    userId?: SortOrder
    hashedPassword?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordUserWhereUniqueInput = Prisma.AtLeast<{
    userId?: bigint | number
    AND?: PasswordUserWhereInput | PasswordUserWhereInput[]
    OR?: PasswordUserWhereInput[]
    NOT?: PasswordUserWhereInput | PasswordUserWhereInput[]
    hashedPassword?: StringFilter<"PasswordUser"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId">

  export type PasswordUserOrderByWithAggregationInput = {
    userId?: SortOrder
    hashedPassword?: SortOrder
    _count?: PasswordUserCountOrderByAggregateInput
    _avg?: PasswordUserAvgOrderByAggregateInput
    _max?: PasswordUserMaxOrderByAggregateInput
    _min?: PasswordUserMinOrderByAggregateInput
    _sum?: PasswordUserSumOrderByAggregateInput
  }

  export type PasswordUserScalarWhereWithAggregatesInput = {
    AND?: PasswordUserScalarWhereWithAggregatesInput | PasswordUserScalarWhereWithAggregatesInput[]
    OR?: PasswordUserScalarWhereWithAggregatesInput[]
    NOT?: PasswordUserScalarWhereWithAggregatesInput | PasswordUserScalarWhereWithAggregatesInput[]
    userId?: BigIntWithAggregatesFilter<"PasswordUser"> | bigint | number
    hashedPassword?: StringWithAggregatesFilter<"PasswordUser"> | string
  }

  export type OAuthUserWhereInput = {
    AND?: OAuthUserWhereInput | OAuthUserWhereInput[]
    OR?: OAuthUserWhereInput[]
    NOT?: OAuthUserWhereInput | OAuthUserWhereInput[]
    id?: IntFilter<"OAuthUser"> | number
    userId?: BigIntFilter<"OAuthUser"> | bigint | number
    provider?: StringFilter<"OAuthUser"> | string
    providerUserId?: StringFilter<"OAuthUser"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OAuthUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    provider_providerUserId?: OAuthUserProviderProviderUserIdCompoundUniqueInput
    AND?: OAuthUserWhereInput | OAuthUserWhereInput[]
    OR?: OAuthUserWhereInput[]
    NOT?: OAuthUserWhereInput | OAuthUserWhereInput[]
    userId?: BigIntFilter<"OAuthUser"> | bigint | number
    provider?: StringFilter<"OAuthUser"> | string
    providerUserId?: StringFilter<"OAuthUser"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerUserId">

  export type OAuthUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    _count?: OAuthUserCountOrderByAggregateInput
    _avg?: OAuthUserAvgOrderByAggregateInput
    _max?: OAuthUserMaxOrderByAggregateInput
    _min?: OAuthUserMinOrderByAggregateInput
    _sum?: OAuthUserSumOrderByAggregateInput
  }

  export type OAuthUserScalarWhereWithAggregatesInput = {
    AND?: OAuthUserScalarWhereWithAggregatesInput | OAuthUserScalarWhereWithAggregatesInput[]
    OR?: OAuthUserScalarWhereWithAggregatesInput[]
    NOT?: OAuthUserScalarWhereWithAggregatesInput | OAuthUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OAuthUser"> | number
    userId?: BigIntWithAggregatesFilter<"OAuthUser"> | bigint | number
    provider?: StringWithAggregatesFilter<"OAuthUser"> | string
    providerUserId?: StringWithAggregatesFilter<"OAuthUser"> | string
  }

  export type OrganizerWhereInput = {
    AND?: OrganizerWhereInput | OrganizerWhereInput[]
    OR?: OrganizerWhereInput[]
    NOT?: OrganizerWhereInput | OrganizerWhereInput[]
    organizerId?: BigIntFilter<"Organizer"> | bigint | number
    userId?: BigIntFilter<"Organizer"> | bigint | number
    companyName?: StringFilter<"Organizer"> | string
    idType?: EnumID_TYPEFilter<"Organizer"> | $Enums.ID_TYPE
    idNumber?: StringFilter<"Organizer"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OrganizerOrderByWithRelationInput = {
    organizerId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    idType?: SortOrder
    idNumber?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OrganizerWhereUniqueInput = Prisma.AtLeast<{
    organizerId?: bigint | number
    userId?: bigint | number
    idNumber?: string
    AND?: OrganizerWhereInput | OrganizerWhereInput[]
    OR?: OrganizerWhereInput[]
    NOT?: OrganizerWhereInput | OrganizerWhereInput[]
    companyName?: StringFilter<"Organizer"> | string
    idType?: EnumID_TYPEFilter<"Organizer"> | $Enums.ID_TYPE
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "organizerId" | "userId" | "idNumber">

  export type OrganizerOrderByWithAggregationInput = {
    organizerId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    idType?: SortOrder
    idNumber?: SortOrder
    _count?: OrganizerCountOrderByAggregateInput
    _avg?: OrganizerAvgOrderByAggregateInput
    _max?: OrganizerMaxOrderByAggregateInput
    _min?: OrganizerMinOrderByAggregateInput
    _sum?: OrganizerSumOrderByAggregateInput
  }

  export type OrganizerScalarWhereWithAggregatesInput = {
    AND?: OrganizerScalarWhereWithAggregatesInput | OrganizerScalarWhereWithAggregatesInput[]
    OR?: OrganizerScalarWhereWithAggregatesInput[]
    NOT?: OrganizerScalarWhereWithAggregatesInput | OrganizerScalarWhereWithAggregatesInput[]
    organizerId?: BigIntWithAggregatesFilter<"Organizer"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"Organizer"> | bigint | number
    companyName?: StringWithAggregatesFilter<"Organizer"> | string
    idType?: EnumID_TYPEWithAggregatesFilter<"Organizer"> | $Enums.ID_TYPE
    idNumber?: StringWithAggregatesFilter<"Organizer"> | string
  }

  export type UserCreateInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUserCreateNestedOneWithoutUserInput
    oauths?: OAuthUserCreateNestedManyWithoutUserInput
    organizer?: OrganizerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUserUncheckedCreateNestedOneWithoutUserInput
    oauths?: OAuthUserUncheckedCreateNestedManyWithoutUserInput
    organizer?: OrganizerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUserUpdateOneWithoutUserNestedInput
    oauths?: OAuthUserUpdateManyWithoutUserNestedInput
    organizer?: OrganizerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUserUncheckedUpdateOneWithoutUserNestedInput
    oauths?: OAuthUserUncheckedUpdateManyWithoutUserNestedInput
    organizer?: OrganizerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordUserCreateInput = {
    hashedPassword: string
    user: UserCreateNestedOneWithoutPasswordInput
  }

  export type PasswordUserUncheckedCreateInput = {
    userId: bigint | number
    hashedPassword: string
  }

  export type PasswordUserUpdateInput = {
    hashedPassword?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPasswordNestedInput
  }

  export type PasswordUserUncheckedUpdateInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordUserCreateManyInput = {
    userId: bigint | number
    hashedPassword: string
  }

  export type PasswordUserUpdateManyMutationInput = {
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordUserUncheckedUpdateManyInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthUserCreateInput = {
    provider: string
    providerUserId: string
    user: UserCreateNestedOneWithoutOauthsInput
  }

  export type OAuthUserUncheckedCreateInput = {
    id?: number
    userId: bigint | number
    provider: string
    providerUserId: string
  }

  export type OAuthUserUpdateInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOauthsNestedInput
  }

  export type OAuthUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthUserCreateManyInput = {
    id?: number
    userId: bigint | number
    provider: string
    providerUserId: string
  }

  export type OAuthUserUpdateManyMutationInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizerCreateInput = {
    organizerId?: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
    user: UserCreateNestedOneWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateInput = {
    organizerId?: bigint | number
    userId: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
  }

  export type OrganizerUpdateInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizerCreateManyInput = {
    organizerId?: bigint | number
    userId: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
  }

  export type OrganizerUpdateManyMutationInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizerUncheckedUpdateManyInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumGENDERNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel> | null
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGENDERNullableFilter<$PrismaModel> | $Enums.GENDER | null
  }

  export type EnumSTATUS_USERFilter<$PrismaModel = never> = {
    equals?: $Enums.STATUS_USER | EnumSTATUS_USERFieldRefInput<$PrismaModel>
    in?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    notIn?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    not?: NestedEnumSTATUS_USERFilter<$PrismaModel> | $Enums.STATUS_USER
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PasswordUserNullableScalarRelationFilter = {
    is?: PasswordUserWhereInput | null
    isNot?: PasswordUserWhereInput | null
  }

  export type OAuthUserListRelationFilter = {
    every?: OAuthUserWhereInput
    some?: OAuthUserWhereInput
    none?: OAuthUserWhereInput
  }

  export type OrganizerNullableScalarRelationFilter = {
    is?: OrganizerWhereInput | null
    isNot?: OrganizerWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OAuthUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumGENDERNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel> | null
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGENDERNullableWithAggregatesFilter<$PrismaModel> | $Enums.GENDER | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGENDERNullableFilter<$PrismaModel>
    _max?: NestedEnumGENDERNullableFilter<$PrismaModel>
  }

  export type EnumSTATUS_USERWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.STATUS_USER | EnumSTATUS_USERFieldRefInput<$PrismaModel>
    in?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    notIn?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    not?: NestedEnumSTATUS_USERWithAggregatesFilter<$PrismaModel> | $Enums.STATUS_USER
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSTATUS_USERFilter<$PrismaModel>
    _max?: NestedEnumSTATUS_USERFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PasswordUserCountOrderByAggregateInput = {
    userId?: SortOrder
    hashedPassword?: SortOrder
  }

  export type PasswordUserAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type PasswordUserMaxOrderByAggregateInput = {
    userId?: SortOrder
    hashedPassword?: SortOrder
  }

  export type PasswordUserMinOrderByAggregateInput = {
    userId?: SortOrder
    hashedPassword?: SortOrder
  }

  export type PasswordUserSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OAuthUserProviderProviderUserIdCompoundUniqueInput = {
    provider: string
    providerUserId: string
  }

  export type OAuthUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
  }

  export type OAuthUserAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type OAuthUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
  }

  export type OAuthUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
  }

  export type OAuthUserSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumID_TYPEFilter<$PrismaModel = never> = {
    equals?: $Enums.ID_TYPE | EnumID_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumID_TYPEFilter<$PrismaModel> | $Enums.ID_TYPE
  }

  export type OrganizerCountOrderByAggregateInput = {
    organizerId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    idType?: SortOrder
    idNumber?: SortOrder
  }

  export type OrganizerAvgOrderByAggregateInput = {
    organizerId?: SortOrder
    userId?: SortOrder
  }

  export type OrganizerMaxOrderByAggregateInput = {
    organizerId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    idType?: SortOrder
    idNumber?: SortOrder
  }

  export type OrganizerMinOrderByAggregateInput = {
    organizerId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    idType?: SortOrder
    idNumber?: SortOrder
  }

  export type OrganizerSumOrderByAggregateInput = {
    organizerId?: SortOrder
    userId?: SortOrder
  }

  export type EnumID_TYPEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ID_TYPE | EnumID_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumID_TYPEWithAggregatesFilter<$PrismaModel> | $Enums.ID_TYPE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumID_TYPEFilter<$PrismaModel>
    _max?: NestedEnumID_TYPEFilter<$PrismaModel>
  }

  export type PasswordUserCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordUserCreateWithoutUserInput, PasswordUserUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordUserCreateOrConnectWithoutUserInput
    connect?: PasswordUserWhereUniqueInput
  }

  export type OAuthUserCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthUserCreateWithoutUserInput, OAuthUserUncheckedCreateWithoutUserInput> | OAuthUserCreateWithoutUserInput[] | OAuthUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserCreateOrConnectWithoutUserInput | OAuthUserCreateOrConnectWithoutUserInput[]
    createMany?: OAuthUserCreateManyUserInputEnvelope
    connect?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
  }

  export type OrganizerCreateNestedOneWithoutUserInput = {
    create?: XOR<OrganizerCreateWithoutUserInput, OrganizerUncheckedCreateWithoutUserInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutUserInput
    connect?: OrganizerWhereUniqueInput
  }

  export type PasswordUserUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordUserCreateWithoutUserInput, PasswordUserUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordUserCreateOrConnectWithoutUserInput
    connect?: PasswordUserWhereUniqueInput
  }

  export type OAuthUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthUserCreateWithoutUserInput, OAuthUserUncheckedCreateWithoutUserInput> | OAuthUserCreateWithoutUserInput[] | OAuthUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserCreateOrConnectWithoutUserInput | OAuthUserCreateOrConnectWithoutUserInput[]
    createMany?: OAuthUserCreateManyUserInputEnvelope
    connect?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
  }

  export type OrganizerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<OrganizerCreateWithoutUserInput, OrganizerUncheckedCreateWithoutUserInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutUserInput
    connect?: OrganizerWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumGENDERFieldUpdateOperationsInput = {
    set?: $Enums.GENDER | null
  }

  export type EnumSTATUS_USERFieldUpdateOperationsInput = {
    set?: $Enums.STATUS_USER
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PasswordUserUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordUserCreateWithoutUserInput, PasswordUserUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordUserCreateOrConnectWithoutUserInput
    upsert?: PasswordUserUpsertWithoutUserInput
    disconnect?: PasswordUserWhereInput | boolean
    delete?: PasswordUserWhereInput | boolean
    connect?: PasswordUserWhereUniqueInput
    update?: XOR<XOR<PasswordUserUpdateToOneWithWhereWithoutUserInput, PasswordUserUpdateWithoutUserInput>, PasswordUserUncheckedUpdateWithoutUserInput>
  }

  export type OAuthUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthUserCreateWithoutUserInput, OAuthUserUncheckedCreateWithoutUserInput> | OAuthUserCreateWithoutUserInput[] | OAuthUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserCreateOrConnectWithoutUserInput | OAuthUserCreateOrConnectWithoutUserInput[]
    upsert?: OAuthUserUpsertWithWhereUniqueWithoutUserInput | OAuthUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthUserCreateManyUserInputEnvelope
    set?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    disconnect?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    delete?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    connect?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    update?: OAuthUserUpdateWithWhereUniqueWithoutUserInput | OAuthUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthUserUpdateManyWithWhereWithoutUserInput | OAuthUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthUserScalarWhereInput | OAuthUserScalarWhereInput[]
  }

  export type OrganizerUpdateOneWithoutUserNestedInput = {
    create?: XOR<OrganizerCreateWithoutUserInput, OrganizerUncheckedCreateWithoutUserInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutUserInput
    upsert?: OrganizerUpsertWithoutUserInput
    disconnect?: OrganizerWhereInput | boolean
    delete?: OrganizerWhereInput | boolean
    connect?: OrganizerWhereUniqueInput
    update?: XOR<XOR<OrganizerUpdateToOneWithWhereWithoutUserInput, OrganizerUpdateWithoutUserInput>, OrganizerUncheckedUpdateWithoutUserInput>
  }

  export type PasswordUserUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordUserCreateWithoutUserInput, PasswordUserUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordUserCreateOrConnectWithoutUserInput
    upsert?: PasswordUserUpsertWithoutUserInput
    disconnect?: PasswordUserWhereInput | boolean
    delete?: PasswordUserWhereInput | boolean
    connect?: PasswordUserWhereUniqueInput
    update?: XOR<XOR<PasswordUserUpdateToOneWithWhereWithoutUserInput, PasswordUserUpdateWithoutUserInput>, PasswordUserUncheckedUpdateWithoutUserInput>
  }

  export type OAuthUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthUserCreateWithoutUserInput, OAuthUserUncheckedCreateWithoutUserInput> | OAuthUserCreateWithoutUserInput[] | OAuthUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserCreateOrConnectWithoutUserInput | OAuthUserCreateOrConnectWithoutUserInput[]
    upsert?: OAuthUserUpsertWithWhereUniqueWithoutUserInput | OAuthUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthUserCreateManyUserInputEnvelope
    set?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    disconnect?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    delete?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    connect?: OAuthUserWhereUniqueInput | OAuthUserWhereUniqueInput[]
    update?: OAuthUserUpdateWithWhereUniqueWithoutUserInput | OAuthUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthUserUpdateManyWithWhereWithoutUserInput | OAuthUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthUserScalarWhereInput | OAuthUserScalarWhereInput[]
  }

  export type OrganizerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<OrganizerCreateWithoutUserInput, OrganizerUncheckedCreateWithoutUserInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutUserInput
    upsert?: OrganizerUpsertWithoutUserInput
    disconnect?: OrganizerWhereInput | boolean
    delete?: OrganizerWhereInput | boolean
    connect?: OrganizerWhereUniqueInput
    update?: XOR<XOR<OrganizerUpdateToOneWithWhereWithoutUserInput, OrganizerUpdateWithoutUserInput>, OrganizerUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPasswordInput = {
    create?: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordNestedInput = {
    create?: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordInput
    upsert?: UserUpsertWithoutPasswordInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordInput, UserUpdateWithoutPasswordInput>, UserUncheckedUpdateWithoutPasswordInput>
  }

  export type UserCreateNestedOneWithoutOauthsInput = {
    create?: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOauthsNestedInput = {
    create?: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthsInput
    upsert?: UserUpsertWithoutOauthsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthsInput, UserUpdateWithoutOauthsInput>, UserUncheckedUpdateWithoutOauthsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutOrganizerInput = {
    create?: XOR<UserCreateWithoutOrganizerInput, UserUncheckedCreateWithoutOrganizerInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizerInput
    connect?: UserWhereUniqueInput
  }

  export type EnumID_TYPEFieldUpdateOperationsInput = {
    set?: $Enums.ID_TYPE
  }

  export type UserUpdateOneRequiredWithoutOrganizerNestedInput = {
    create?: XOR<UserCreateWithoutOrganizerInput, UserUncheckedCreateWithoutOrganizerInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizerInput
    upsert?: UserUpsertWithoutOrganizerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrganizerInput, UserUpdateWithoutOrganizerInput>, UserUncheckedUpdateWithoutOrganizerInput>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumGENDERNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel> | null
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGENDERNullableFilter<$PrismaModel> | $Enums.GENDER | null
  }

  export type NestedEnumSTATUS_USERFilter<$PrismaModel = never> = {
    equals?: $Enums.STATUS_USER | EnumSTATUS_USERFieldRefInput<$PrismaModel>
    in?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    notIn?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    not?: NestedEnumSTATUS_USERFilter<$PrismaModel> | $Enums.STATUS_USER
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumGENDERNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel> | null
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGENDERNullableWithAggregatesFilter<$PrismaModel> | $Enums.GENDER | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGENDERNullableFilter<$PrismaModel>
    _max?: NestedEnumGENDERNullableFilter<$PrismaModel>
  }

  export type NestedEnumSTATUS_USERWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.STATUS_USER | EnumSTATUS_USERFieldRefInput<$PrismaModel>
    in?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    notIn?: $Enums.STATUS_USER[] | ListEnumSTATUS_USERFieldRefInput<$PrismaModel>
    not?: NestedEnumSTATUS_USERWithAggregatesFilter<$PrismaModel> | $Enums.STATUS_USER
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSTATUS_USERFilter<$PrismaModel>
    _max?: NestedEnumSTATUS_USERFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumID_TYPEFilter<$PrismaModel = never> = {
    equals?: $Enums.ID_TYPE | EnumID_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumID_TYPEFilter<$PrismaModel> | $Enums.ID_TYPE
  }

  export type NestedEnumID_TYPEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ID_TYPE | EnumID_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ID_TYPE[] | ListEnumID_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumID_TYPEWithAggregatesFilter<$PrismaModel> | $Enums.ID_TYPE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumID_TYPEFilter<$PrismaModel>
    _max?: NestedEnumID_TYPEFilter<$PrismaModel>
  }

  export type PasswordUserCreateWithoutUserInput = {
    hashedPassword: string
  }

  export type PasswordUserUncheckedCreateWithoutUserInput = {
    hashedPassword: string
  }

  export type PasswordUserCreateOrConnectWithoutUserInput = {
    where: PasswordUserWhereUniqueInput
    create: XOR<PasswordUserCreateWithoutUserInput, PasswordUserUncheckedCreateWithoutUserInput>
  }

  export type OAuthUserCreateWithoutUserInput = {
    provider: string
    providerUserId: string
  }

  export type OAuthUserUncheckedCreateWithoutUserInput = {
    id?: number
    provider: string
    providerUserId: string
  }

  export type OAuthUserCreateOrConnectWithoutUserInput = {
    where: OAuthUserWhereUniqueInput
    create: XOR<OAuthUserCreateWithoutUserInput, OAuthUserUncheckedCreateWithoutUserInput>
  }

  export type OAuthUserCreateManyUserInputEnvelope = {
    data: OAuthUserCreateManyUserInput | OAuthUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizerCreateWithoutUserInput = {
    organizerId?: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
  }

  export type OrganizerUncheckedCreateWithoutUserInput = {
    organizerId?: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
  }

  export type OrganizerCreateOrConnectWithoutUserInput = {
    where: OrganizerWhereUniqueInput
    create: XOR<OrganizerCreateWithoutUserInput, OrganizerUncheckedCreateWithoutUserInput>
  }

  export type PasswordUserUpsertWithoutUserInput = {
    update: XOR<PasswordUserUpdateWithoutUserInput, PasswordUserUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordUserCreateWithoutUserInput, PasswordUserUncheckedCreateWithoutUserInput>
    where?: PasswordUserWhereInput
  }

  export type PasswordUserUpdateToOneWithWhereWithoutUserInput = {
    where?: PasswordUserWhereInput
    data: XOR<PasswordUserUpdateWithoutUserInput, PasswordUserUncheckedUpdateWithoutUserInput>
  }

  export type PasswordUserUpdateWithoutUserInput = {
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordUserUncheckedUpdateWithoutUserInput = {
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthUserUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthUserWhereUniqueInput
    update: XOR<OAuthUserUpdateWithoutUserInput, OAuthUserUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthUserCreateWithoutUserInput, OAuthUserUncheckedCreateWithoutUserInput>
  }

  export type OAuthUserUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthUserWhereUniqueInput
    data: XOR<OAuthUserUpdateWithoutUserInput, OAuthUserUncheckedUpdateWithoutUserInput>
  }

  export type OAuthUserUpdateManyWithWhereWithoutUserInput = {
    where: OAuthUserScalarWhereInput
    data: XOR<OAuthUserUpdateManyMutationInput, OAuthUserUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthUserScalarWhereInput = {
    AND?: OAuthUserScalarWhereInput | OAuthUserScalarWhereInput[]
    OR?: OAuthUserScalarWhereInput[]
    NOT?: OAuthUserScalarWhereInput | OAuthUserScalarWhereInput[]
    id?: IntFilter<"OAuthUser"> | number
    userId?: BigIntFilter<"OAuthUser"> | bigint | number
    provider?: StringFilter<"OAuthUser"> | string
    providerUserId?: StringFilter<"OAuthUser"> | string
  }

  export type OrganizerUpsertWithoutUserInput = {
    update: XOR<OrganizerUpdateWithoutUserInput, OrganizerUncheckedUpdateWithoutUserInput>
    create: XOR<OrganizerCreateWithoutUserInput, OrganizerUncheckedCreateWithoutUserInput>
    where?: OrganizerWhereInput
  }

  export type OrganizerUpdateToOneWithWhereWithoutUserInput = {
    where?: OrganizerWhereInput
    data: XOR<OrganizerUpdateWithoutUserInput, OrganizerUncheckedUpdateWithoutUserInput>
  }

  export type OrganizerUpdateWithoutUserInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizerUncheckedUpdateWithoutUserInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPasswordInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    oauths?: OAuthUserCreateNestedManyWithoutUserInput
    organizer?: OrganizerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    oauths?: OAuthUserUncheckedCreateNestedManyWithoutUserInput
    organizer?: OrganizerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
  }

  export type UserUpsertWithoutPasswordInput = {
    update: XOR<UserUpdateWithoutPasswordInput, UserUncheckedUpdateWithoutPasswordInput>
    create: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordInput, UserUncheckedUpdateWithoutPasswordInput>
  }

  export type UserUpdateWithoutPasswordInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauths?: OAuthUserUpdateManyWithoutUserNestedInput
    organizer?: OrganizerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauths?: OAuthUserUncheckedUpdateManyWithoutUserNestedInput
    organizer?: OrganizerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutOauthsInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUserCreateNestedOneWithoutUserInput
    organizer?: OrganizerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthsInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUserUncheckedCreateNestedOneWithoutUserInput
    organizer?: OrganizerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
  }

  export type UserUpsertWithoutOauthsInput = {
    update: XOR<UserUpdateWithoutOauthsInput, UserUncheckedUpdateWithoutOauthsInput>
    create: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthsInput, UserUncheckedUpdateWithoutOauthsInput>
  }

  export type UserUpdateWithoutOauthsInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUserUpdateOneWithoutUserNestedInput
    organizer?: OrganizerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthsInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUserUncheckedUpdateOneWithoutUserNestedInput
    organizer?: OrganizerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutOrganizerInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUserCreateNestedOneWithoutUserInput
    oauths?: OAuthUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizerInput = {
    userId?: bigint | number
    name: string
    lastName: string
    phone?: string | null
    email: string
    birthdate?: Date | string | null
    gender?: $Enums.GENDER | null
    status?: $Enums.STATUS_USER
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUserUncheckedCreateNestedOneWithoutUserInput
    oauths?: OAuthUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizerInput, UserUncheckedCreateWithoutOrganizerInput>
  }

  export type UserUpsertWithoutOrganizerInput = {
    update: XOR<UserUpdateWithoutOrganizerInput, UserUncheckedUpdateWithoutOrganizerInput>
    create: XOR<UserCreateWithoutOrganizerInput, UserUncheckedCreateWithoutOrganizerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrganizerInput, UserUncheckedUpdateWithoutOrganizerInput>
  }

  export type UserUpdateWithoutOrganizerInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUserUpdateOneWithoutUserNestedInput
    oauths?: OAuthUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizerInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGENDERFieldUpdateOperationsInput | $Enums.GENDER | null
    status?: EnumSTATUS_USERFieldUpdateOperationsInput | $Enums.STATUS_USER
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUserUncheckedUpdateOneWithoutUserNestedInput
    oauths?: OAuthUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthUserCreateManyUserInput = {
    id?: number
    provider: string
    providerUserId: string
  }

  export type OAuthUserUpdateWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthUserUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthUserUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}