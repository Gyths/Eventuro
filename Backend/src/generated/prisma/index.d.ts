
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
 * Model EventCategory
 * 
 */
export type EventCategory = $Result.DefaultSelection<Prisma.$EventCategoryPayload>
/**
 * Model EventToCategory
 * 
 */
export type EventToCategory = $Result.DefaultSelection<Prisma.$EventToCategoryPayload>
/**
 * Model Venue
 * 
 */
export type Venue = $Result.DefaultSelection<Prisma.$VenuePayload>
/**
 * Model Fee
 * 
 */
export type Fee = $Result.DefaultSelection<Prisma.$FeePayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model EventDate
 * 
 */
export type EventDate = $Result.DefaultSelection<Prisma.$EventDatePayload>
/**
 * Model EventDateZone
 * 
 */
export type EventDateZone = $Result.DefaultSelection<Prisma.$EventDateZonePayload>
/**
 * Model SeatMap
 * 
 */
export type SeatMap = $Result.DefaultSelection<Prisma.$SeatMapPayload>
/**
 * Model Seat
 * 
 */
export type Seat = $Result.DefaultSelection<Prisma.$SeatPayload>
/**
 * Model EventDateZoneAllocation
 * 
 */
export type EventDateZoneAllocation = $Result.DefaultSelection<Prisma.$EventDateZoneAllocationPayload>
/**
 * Model EventSalesPhase
 * 
 */
export type EventSalesPhase = $Result.DefaultSelection<Prisma.$EventSalesPhasePayload>

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


export const ACCESS_POLICY: {
  E: 'E',
  T: 'T',
  AO: 'AO'
};

export type ACCESS_POLICY = (typeof ACCESS_POLICY)[keyof typeof ACCESS_POLICY]


export const EVENT_STATUS: {
  P: 'P',
  A: 'A',
  D: 'D'
};

export type EVENT_STATUS = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]


export const ZONE_KIND: {
  GENERAL: 'GENERAL',
  SEATED: 'SEATED'
};

export type ZONE_KIND = (typeof ZONE_KIND)[keyof typeof ZONE_KIND]


export const CURRENCY: {
  S: 'S',
  USD: 'USD'
};

export type CURRENCY = (typeof CURRENCY)[keyof typeof CURRENCY]

}

export type GENDER = $Enums.GENDER

export const GENDER: typeof $Enums.GENDER

export type STATUS_USER = $Enums.STATUS_USER

export const STATUS_USER: typeof $Enums.STATUS_USER

export type ID_TYPE = $Enums.ID_TYPE

export const ID_TYPE: typeof $Enums.ID_TYPE

export type ACCESS_POLICY = $Enums.ACCESS_POLICY

export const ACCESS_POLICY: typeof $Enums.ACCESS_POLICY

export type EVENT_STATUS = $Enums.EVENT_STATUS

export const EVENT_STATUS: typeof $Enums.EVENT_STATUS

export type ZONE_KIND = $Enums.ZONE_KIND

export const ZONE_KIND: typeof $Enums.ZONE_KIND

export type CURRENCY = $Enums.CURRENCY

export const CURRENCY: typeof $Enums.CURRENCY

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

  /**
   * `prisma.eventCategory`: Exposes CRUD operations for the **EventCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventCategories
    * const eventCategories = await prisma.eventCategory.findMany()
    * ```
    */
  get eventCategory(): Prisma.EventCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventToCategory`: Exposes CRUD operations for the **EventToCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventToCategories
    * const eventToCategories = await prisma.eventToCategory.findMany()
    * ```
    */
  get eventToCategory(): Prisma.EventToCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venue`: Exposes CRUD operations for the **Venue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Venues
    * const venues = await prisma.venue.findMany()
    * ```
    */
  get venue(): Prisma.VenueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fee`: Exposes CRUD operations for the **Fee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fees
    * const fees = await prisma.fee.findMany()
    * ```
    */
  get fee(): Prisma.FeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventDate`: Exposes CRUD operations for the **EventDate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventDates
    * const eventDates = await prisma.eventDate.findMany()
    * ```
    */
  get eventDate(): Prisma.EventDateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventDateZone`: Exposes CRUD operations for the **EventDateZone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventDateZones
    * const eventDateZones = await prisma.eventDateZone.findMany()
    * ```
    */
  get eventDateZone(): Prisma.EventDateZoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seatMap`: Exposes CRUD operations for the **SeatMap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SeatMaps
    * const seatMaps = await prisma.seatMap.findMany()
    * ```
    */
  get seatMap(): Prisma.SeatMapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seat`: Exposes CRUD operations for the **Seat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Seats
    * const seats = await prisma.seat.findMany()
    * ```
    */
  get seat(): Prisma.SeatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventDateZoneAllocation`: Exposes CRUD operations for the **EventDateZoneAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventDateZoneAllocations
    * const eventDateZoneAllocations = await prisma.eventDateZoneAllocation.findMany()
    * ```
    */
  get eventDateZoneAllocation(): Prisma.EventDateZoneAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventSalesPhase`: Exposes CRUD operations for the **EventSalesPhase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventSalesPhases
    * const eventSalesPhases = await prisma.eventSalesPhase.findMany()
    * ```
    */
  get eventSalesPhase(): Prisma.EventSalesPhaseDelegate<ExtArgs, ClientOptions>;
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
    Organizer: 'Organizer',
    EventCategory: 'EventCategory',
    EventToCategory: 'EventToCategory',
    Venue: 'Venue',
    Fee: 'Fee',
    Event: 'Event',
    EventDate: 'EventDate',
    EventDateZone: 'EventDateZone',
    SeatMap: 'SeatMap',
    Seat: 'Seat',
    EventDateZoneAllocation: 'EventDateZoneAllocation',
    EventSalesPhase: 'EventSalesPhase'
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
      modelProps: "user" | "passwordUser" | "oAuthUser" | "organizer" | "eventCategory" | "eventToCategory" | "venue" | "fee" | "event" | "eventDate" | "eventDateZone" | "seatMap" | "seat" | "eventDateZoneAllocation" | "eventSalesPhase"
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
      EventCategory: {
        payload: Prisma.$EventCategoryPayload<ExtArgs>
        fields: Prisma.EventCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>
          }
          findFirst: {
            args: Prisma.EventCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>
          }
          findMany: {
            args: Prisma.EventCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>[]
          }
          create: {
            args: Prisma.EventCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>
          }
          createMany: {
            args: Prisma.EventCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>[]
          }
          delete: {
            args: Prisma.EventCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>
          }
          update: {
            args: Prisma.EventCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>
          }
          deleteMany: {
            args: Prisma.EventCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>[]
          }
          upsert: {
            args: Prisma.EventCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCategoryPayload>
          }
          aggregate: {
            args: Prisma.EventCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventCategory>
          }
          groupBy: {
            args: Prisma.EventCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<EventCategoryCountAggregateOutputType> | number
          }
        }
      }
      EventToCategory: {
        payload: Prisma.$EventToCategoryPayload<ExtArgs>
        fields: Prisma.EventToCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventToCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventToCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>
          }
          findFirst: {
            args: Prisma.EventToCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventToCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>
          }
          findMany: {
            args: Prisma.EventToCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>[]
          }
          create: {
            args: Prisma.EventToCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>
          }
          createMany: {
            args: Prisma.EventToCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventToCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>[]
          }
          delete: {
            args: Prisma.EventToCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>
          }
          update: {
            args: Prisma.EventToCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>
          }
          deleteMany: {
            args: Prisma.EventToCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventToCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventToCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>[]
          }
          upsert: {
            args: Prisma.EventToCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventToCategoryPayload>
          }
          aggregate: {
            args: Prisma.EventToCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventToCategory>
          }
          groupBy: {
            args: Prisma.EventToCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventToCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventToCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<EventToCategoryCountAggregateOutputType> | number
          }
        }
      }
      Venue: {
        payload: Prisma.$VenuePayload<ExtArgs>
        fields: Prisma.VenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findFirst: {
            args: Prisma.VenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findMany: {
            args: Prisma.VenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          create: {
            args: Prisma.VenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          createMany: {
            args: Prisma.VenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VenueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          delete: {
            args: Prisma.VenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          update: {
            args: Prisma.VenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          deleteMany: {
            args: Prisma.VenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VenueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          upsert: {
            args: Prisma.VenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          aggregate: {
            args: Prisma.VenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenue>
          }
          groupBy: {
            args: Prisma.VenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<VenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.VenueCountArgs<ExtArgs>
            result: $Utils.Optional<VenueCountAggregateOutputType> | number
          }
        }
      }
      Fee: {
        payload: Prisma.$FeePayload<ExtArgs>
        fields: Prisma.FeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>
          }
          findFirst: {
            args: Prisma.FeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>
          }
          findMany: {
            args: Prisma.FeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>[]
          }
          create: {
            args: Prisma.FeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>
          }
          createMany: {
            args: Prisma.FeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>[]
          }
          delete: {
            args: Prisma.FeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>
          }
          update: {
            args: Prisma.FeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>
          }
          deleteMany: {
            args: Prisma.FeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>[]
          }
          upsert: {
            args: Prisma.FeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeePayload>
          }
          aggregate: {
            args: Prisma.FeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFee>
          }
          groupBy: {
            args: Prisma.FeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeeCountArgs<ExtArgs>
            result: $Utils.Optional<FeeCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      EventDate: {
        payload: Prisma.$EventDatePayload<ExtArgs>
        fields: Prisma.EventDateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventDateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventDateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>
          }
          findFirst: {
            args: Prisma.EventDateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventDateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>
          }
          findMany: {
            args: Prisma.EventDateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>[]
          }
          create: {
            args: Prisma.EventDateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>
          }
          createMany: {
            args: Prisma.EventDateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventDateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>[]
          }
          delete: {
            args: Prisma.EventDateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>
          }
          update: {
            args: Prisma.EventDateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>
          }
          deleteMany: {
            args: Prisma.EventDateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventDateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventDateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>[]
          }
          upsert: {
            args: Prisma.EventDateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDatePayload>
          }
          aggregate: {
            args: Prisma.EventDateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventDate>
          }
          groupBy: {
            args: Prisma.EventDateGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventDateGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventDateCountArgs<ExtArgs>
            result: $Utils.Optional<EventDateCountAggregateOutputType> | number
          }
        }
      }
      EventDateZone: {
        payload: Prisma.$EventDateZonePayload<ExtArgs>
        fields: Prisma.EventDateZoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventDateZoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventDateZoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>
          }
          findFirst: {
            args: Prisma.EventDateZoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventDateZoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>
          }
          findMany: {
            args: Prisma.EventDateZoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>[]
          }
          create: {
            args: Prisma.EventDateZoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>
          }
          createMany: {
            args: Prisma.EventDateZoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventDateZoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>[]
          }
          delete: {
            args: Prisma.EventDateZoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>
          }
          update: {
            args: Prisma.EventDateZoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>
          }
          deleteMany: {
            args: Prisma.EventDateZoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventDateZoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventDateZoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>[]
          }
          upsert: {
            args: Prisma.EventDateZoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZonePayload>
          }
          aggregate: {
            args: Prisma.EventDateZoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventDateZone>
          }
          groupBy: {
            args: Prisma.EventDateZoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventDateZoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventDateZoneCountArgs<ExtArgs>
            result: $Utils.Optional<EventDateZoneCountAggregateOutputType> | number
          }
        }
      }
      SeatMap: {
        payload: Prisma.$SeatMapPayload<ExtArgs>
        fields: Prisma.SeatMapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SeatMapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SeatMapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>
          }
          findFirst: {
            args: Prisma.SeatMapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SeatMapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>
          }
          findMany: {
            args: Prisma.SeatMapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>[]
          }
          create: {
            args: Prisma.SeatMapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>
          }
          createMany: {
            args: Prisma.SeatMapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SeatMapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>[]
          }
          delete: {
            args: Prisma.SeatMapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>
          }
          update: {
            args: Prisma.SeatMapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>
          }
          deleteMany: {
            args: Prisma.SeatMapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SeatMapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SeatMapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>[]
          }
          upsert: {
            args: Prisma.SeatMapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatMapPayload>
          }
          aggregate: {
            args: Prisma.SeatMapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeatMap>
          }
          groupBy: {
            args: Prisma.SeatMapGroupByArgs<ExtArgs>
            result: $Utils.Optional<SeatMapGroupByOutputType>[]
          }
          count: {
            args: Prisma.SeatMapCountArgs<ExtArgs>
            result: $Utils.Optional<SeatMapCountAggregateOutputType> | number
          }
        }
      }
      Seat: {
        payload: Prisma.$SeatPayload<ExtArgs>
        fields: Prisma.SeatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SeatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SeatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          findFirst: {
            args: Prisma.SeatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SeatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          findMany: {
            args: Prisma.SeatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          create: {
            args: Prisma.SeatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          createMany: {
            args: Prisma.SeatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SeatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          delete: {
            args: Prisma.SeatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          update: {
            args: Prisma.SeatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          deleteMany: {
            args: Prisma.SeatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SeatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SeatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          upsert: {
            args: Prisma.SeatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          aggregate: {
            args: Prisma.SeatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeat>
          }
          groupBy: {
            args: Prisma.SeatGroupByArgs<ExtArgs>
            result: $Utils.Optional<SeatGroupByOutputType>[]
          }
          count: {
            args: Prisma.SeatCountArgs<ExtArgs>
            result: $Utils.Optional<SeatCountAggregateOutputType> | number
          }
        }
      }
      EventDateZoneAllocation: {
        payload: Prisma.$EventDateZoneAllocationPayload<ExtArgs>
        fields: Prisma.EventDateZoneAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventDateZoneAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventDateZoneAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>
          }
          findFirst: {
            args: Prisma.EventDateZoneAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventDateZoneAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>
          }
          findMany: {
            args: Prisma.EventDateZoneAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>[]
          }
          create: {
            args: Prisma.EventDateZoneAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>
          }
          createMany: {
            args: Prisma.EventDateZoneAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventDateZoneAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>[]
          }
          delete: {
            args: Prisma.EventDateZoneAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>
          }
          update: {
            args: Prisma.EventDateZoneAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>
          }
          deleteMany: {
            args: Prisma.EventDateZoneAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventDateZoneAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventDateZoneAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>[]
          }
          upsert: {
            args: Prisma.EventDateZoneAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDateZoneAllocationPayload>
          }
          aggregate: {
            args: Prisma.EventDateZoneAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventDateZoneAllocation>
          }
          groupBy: {
            args: Prisma.EventDateZoneAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventDateZoneAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventDateZoneAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<EventDateZoneAllocationCountAggregateOutputType> | number
          }
        }
      }
      EventSalesPhase: {
        payload: Prisma.$EventSalesPhasePayload<ExtArgs>
        fields: Prisma.EventSalesPhaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventSalesPhaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventSalesPhaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>
          }
          findFirst: {
            args: Prisma.EventSalesPhaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventSalesPhaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>
          }
          findMany: {
            args: Prisma.EventSalesPhaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>[]
          }
          create: {
            args: Prisma.EventSalesPhaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>
          }
          createMany: {
            args: Prisma.EventSalesPhaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventSalesPhaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>[]
          }
          delete: {
            args: Prisma.EventSalesPhaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>
          }
          update: {
            args: Prisma.EventSalesPhaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>
          }
          deleteMany: {
            args: Prisma.EventSalesPhaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventSalesPhaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventSalesPhaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>[]
          }
          upsert: {
            args: Prisma.EventSalesPhaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSalesPhasePayload>
          }
          aggregate: {
            args: Prisma.EventSalesPhaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventSalesPhase>
          }
          groupBy: {
            args: Prisma.EventSalesPhaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventSalesPhaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventSalesPhaseCountArgs<ExtArgs>
            result: $Utils.Optional<EventSalesPhaseCountAggregateOutputType> | number
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
    eventCategory?: EventCategoryOmit
    eventToCategory?: EventToCategoryOmit
    venue?: VenueOmit
    fee?: FeeOmit
    event?: EventOmit
    eventDate?: EventDateOmit
    eventDateZone?: EventDateZoneOmit
    seatMap?: SeatMapOmit
    seat?: SeatOmit
    eventDateZoneAllocation?: EventDateZoneAllocationOmit
    eventSalesPhase?: EventSalesPhaseOmit
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
   * Count Type OrganizerCountOutputType
   */

  export type OrganizerCountOutputType = {
    events: number
  }

  export type OrganizerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | OrganizerCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * OrganizerCountOutputType without action
   */
  export type OrganizerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizerCountOutputType
     */
    select?: OrganizerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizerCountOutputType without action
   */
  export type OrganizerCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type EventCategoryCountOutputType
   */

  export type EventCategoryCountOutputType = {
    events: number
  }

  export type EventCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | EventCategoryCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * EventCategoryCountOutputType without action
   */
  export type EventCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategoryCountOutputType
     */
    select?: EventCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCategoryCountOutputType without action
   */
  export type EventCategoryCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventToCategoryWhereInput
  }


  /**
   * Count Type FeeCountOutputType
   */

  export type FeeCountOutputType = {
    event: number
  }

  export type FeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | FeeCountOutputTypeCountEventArgs
  }

  // Custom InputTypes
  /**
   * FeeCountOutputType without action
   */
  export type FeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeCountOutputType
     */
    select?: FeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FeeCountOutputType without action
   */
  export type FeeCountOutputTypeCountEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    categories: number
    dates: number
    salesPhases: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | EventCountOutputTypeCountCategoriesArgs
    dates?: boolean | EventCountOutputTypeCountDatesArgs
    salesPhases?: boolean | EventCountOutputTypeCountSalesPhasesArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventToCategoryWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountDatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDateWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountSalesPhasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventSalesPhaseWhereInput
  }


  /**
   * Count Type EventDateCountOutputType
   */

  export type EventDateCountOutputType = {
    zoneDates: number
  }

  export type EventDateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    zoneDates?: boolean | EventDateCountOutputTypeCountZoneDatesArgs
  }

  // Custom InputTypes
  /**
   * EventDateCountOutputType without action
   */
  export type EventDateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateCountOutputType
     */
    select?: EventDateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventDateCountOutputType without action
   */
  export type EventDateCountOutputTypeCountZoneDatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDateZoneWhereInput
  }


  /**
   * Count Type EventDateZoneCountOutputType
   */

  export type EventDateZoneCountOutputType = {
    allocations: number
  }

  export type EventDateZoneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    allocations?: boolean | EventDateZoneCountOutputTypeCountAllocationsArgs
  }

  // Custom InputTypes
  /**
   * EventDateZoneCountOutputType without action
   */
  export type EventDateZoneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneCountOutputType
     */
    select?: EventDateZoneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventDateZoneCountOutputType without action
   */
  export type EventDateZoneCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDateZoneAllocationWhereInput
  }


  /**
   * Count Type SeatMapCountOutputType
   */

  export type SeatMapCountOutputType = {
    occupiedSeats: number
  }

  export type SeatMapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    occupiedSeats?: boolean | SeatMapCountOutputTypeCountOccupiedSeatsArgs
  }

  // Custom InputTypes
  /**
   * SeatMapCountOutputType without action
   */
  export type SeatMapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMapCountOutputType
     */
    select?: SeatMapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SeatMapCountOutputType without action
   */
  export type SeatMapCountOutputTypeCountOccupiedSeatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeatWhereInput
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
    events?: boolean | Organizer$eventsArgs<ExtArgs>
    _count?: boolean | OrganizerCountOutputTypeDefaultArgs<ExtArgs>
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
    events?: boolean | Organizer$eventsArgs<ExtArgs>
    _count?: boolean | OrganizerCountOutputTypeDefaultArgs<ExtArgs>
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
      events: Prisma.$EventPayload<ExtArgs>[]
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
    events<T extends Organizer$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Organizer$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Organizer.events
   */
  export type Organizer$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
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
   * Model EventCategory
   */

  export type AggregateEventCategory = {
    _count: EventCategoryCountAggregateOutputType | null
    _avg: EventCategoryAvgAggregateOutputType | null
    _sum: EventCategorySumAggregateOutputType | null
    _min: EventCategoryMinAggregateOutputType | null
    _max: EventCategoryMaxAggregateOutputType | null
  }

  export type EventCategoryAvgAggregateOutputType = {
    eventCategoryId: number | null
  }

  export type EventCategorySumAggregateOutputType = {
    eventCategoryId: bigint | null
  }

  export type EventCategoryMinAggregateOutputType = {
    eventCategoryId: bigint | null
    initials: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCategoryMaxAggregateOutputType = {
    eventCategoryId: bigint | null
    initials: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCategoryCountAggregateOutputType = {
    eventCategoryId: number
    initials: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventCategoryAvgAggregateInputType = {
    eventCategoryId?: true
  }

  export type EventCategorySumAggregateInputType = {
    eventCategoryId?: true
  }

  export type EventCategoryMinAggregateInputType = {
    eventCategoryId?: true
    initials?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCategoryMaxAggregateInputType = {
    eventCategoryId?: true
    initials?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCategoryCountAggregateInputType = {
    eventCategoryId?: true
    initials?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventCategory to aggregate.
     */
    where?: EventCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCategories to fetch.
     */
    orderBy?: EventCategoryOrderByWithRelationInput | EventCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventCategories
    **/
    _count?: true | EventCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventCategoryMaxAggregateInputType
  }

  export type GetEventCategoryAggregateType<T extends EventCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateEventCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventCategory[P]>
      : GetScalarType<T[P], AggregateEventCategory[P]>
  }




  export type EventCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventCategoryWhereInput
    orderBy?: EventCategoryOrderByWithAggregationInput | EventCategoryOrderByWithAggregationInput[]
    by: EventCategoryScalarFieldEnum[] | EventCategoryScalarFieldEnum
    having?: EventCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCategoryCountAggregateInputType | true
    _avg?: EventCategoryAvgAggregateInputType
    _sum?: EventCategorySumAggregateInputType
    _min?: EventCategoryMinAggregateInputType
    _max?: EventCategoryMaxAggregateInputType
  }

  export type EventCategoryGroupByOutputType = {
    eventCategoryId: bigint
    initials: string
    description: string
    createdAt: Date
    updatedAt: Date
    _count: EventCategoryCountAggregateOutputType | null
    _avg: EventCategoryAvgAggregateOutputType | null
    _sum: EventCategorySumAggregateOutputType | null
    _min: EventCategoryMinAggregateOutputType | null
    _max: EventCategoryMaxAggregateOutputType | null
  }

  type GetEventCategoryGroupByPayload<T extends EventCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], EventCategoryGroupByOutputType[P]>
        }
      >
    >


  export type EventCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventCategoryId?: boolean
    initials?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | EventCategory$eventsArgs<ExtArgs>
    _count?: boolean | EventCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventCategory"]>

  export type EventCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventCategoryId?: boolean
    initials?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eventCategory"]>

  export type EventCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventCategoryId?: boolean
    initials?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eventCategory"]>

  export type EventCategorySelectScalar = {
    eventCategoryId?: boolean
    initials?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventCategoryId" | "initials" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["eventCategory"]>
  export type EventCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | EventCategory$eventsArgs<ExtArgs>
    _count?: boolean | EventCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventCategory"
    objects: {
      events: Prisma.$EventToCategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      eventCategoryId: bigint
      initials: string
      description: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventCategory"]>
    composites: {}
  }

  type EventCategoryGetPayload<S extends boolean | null | undefined | EventCategoryDefaultArgs> = $Result.GetResult<Prisma.$EventCategoryPayload, S>

  type EventCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCategoryCountAggregateInputType | true
    }

  export interface EventCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventCategory'], meta: { name: 'EventCategory' } }
    /**
     * Find zero or one EventCategory that matches the filter.
     * @param {EventCategoryFindUniqueArgs} args - Arguments to find a EventCategory
     * @example
     * // Get one EventCategory
     * const eventCategory = await prisma.eventCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventCategoryFindUniqueArgs>(args: SelectSubset<T, EventCategoryFindUniqueArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventCategoryFindUniqueOrThrowArgs} args - Arguments to find a EventCategory
     * @example
     * // Get one EventCategory
     * const eventCategory = await prisma.eventCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, EventCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryFindFirstArgs} args - Arguments to find a EventCategory
     * @example
     * // Get one EventCategory
     * const eventCategory = await prisma.eventCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventCategoryFindFirstArgs>(args?: SelectSubset<T, EventCategoryFindFirstArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryFindFirstOrThrowArgs} args - Arguments to find a EventCategory
     * @example
     * // Get one EventCategory
     * const eventCategory = await prisma.eventCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, EventCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventCategories
     * const eventCategories = await prisma.eventCategory.findMany()
     * 
     * // Get first 10 EventCategories
     * const eventCategories = await prisma.eventCategory.findMany({ take: 10 })
     * 
     * // Only select the `eventCategoryId`
     * const eventCategoryWithEventCategoryIdOnly = await prisma.eventCategory.findMany({ select: { eventCategoryId: true } })
     * 
     */
    findMany<T extends EventCategoryFindManyArgs>(args?: SelectSubset<T, EventCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventCategory.
     * @param {EventCategoryCreateArgs} args - Arguments to create a EventCategory.
     * @example
     * // Create one EventCategory
     * const EventCategory = await prisma.eventCategory.create({
     *   data: {
     *     // ... data to create a EventCategory
     *   }
     * })
     * 
     */
    create<T extends EventCategoryCreateArgs>(args: SelectSubset<T, EventCategoryCreateArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventCategories.
     * @param {EventCategoryCreateManyArgs} args - Arguments to create many EventCategories.
     * @example
     * // Create many EventCategories
     * const eventCategory = await prisma.eventCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCategoryCreateManyArgs>(args?: SelectSubset<T, EventCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventCategories and returns the data saved in the database.
     * @param {EventCategoryCreateManyAndReturnArgs} args - Arguments to create many EventCategories.
     * @example
     * // Create many EventCategories
     * const eventCategory = await prisma.eventCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventCategories and only return the `eventCategoryId`
     * const eventCategoryWithEventCategoryIdOnly = await prisma.eventCategory.createManyAndReturn({
     *   select: { eventCategoryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventCategory.
     * @param {EventCategoryDeleteArgs} args - Arguments to delete one EventCategory.
     * @example
     * // Delete one EventCategory
     * const EventCategory = await prisma.eventCategory.delete({
     *   where: {
     *     // ... filter to delete one EventCategory
     *   }
     * })
     * 
     */
    delete<T extends EventCategoryDeleteArgs>(args: SelectSubset<T, EventCategoryDeleteArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventCategory.
     * @param {EventCategoryUpdateArgs} args - Arguments to update one EventCategory.
     * @example
     * // Update one EventCategory
     * const eventCategory = await prisma.eventCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventCategoryUpdateArgs>(args: SelectSubset<T, EventCategoryUpdateArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventCategories.
     * @param {EventCategoryDeleteManyArgs} args - Arguments to filter EventCategories to delete.
     * @example
     * // Delete a few EventCategories
     * const { count } = await prisma.eventCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventCategoryDeleteManyArgs>(args?: SelectSubset<T, EventCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventCategories
     * const eventCategory = await prisma.eventCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventCategoryUpdateManyArgs>(args: SelectSubset<T, EventCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCategories and returns the data updated in the database.
     * @param {EventCategoryUpdateManyAndReturnArgs} args - Arguments to update many EventCategories.
     * @example
     * // Update many EventCategories
     * const eventCategory = await prisma.eventCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventCategories and only return the `eventCategoryId`
     * const eventCategoryWithEventCategoryIdOnly = await prisma.eventCategory.updateManyAndReturn({
     *   select: { eventCategoryId: true },
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
    updateManyAndReturn<T extends EventCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, EventCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventCategory.
     * @param {EventCategoryUpsertArgs} args - Arguments to update or create a EventCategory.
     * @example
     * // Update or create a EventCategory
     * const eventCategory = await prisma.eventCategory.upsert({
     *   create: {
     *     // ... data to create a EventCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventCategory we want to update
     *   }
     * })
     */
    upsert<T extends EventCategoryUpsertArgs>(args: SelectSubset<T, EventCategoryUpsertArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryCountArgs} args - Arguments to filter EventCategories to count.
     * @example
     * // Count the number of EventCategories
     * const count = await prisma.eventCategory.count({
     *   where: {
     *     // ... the filter for the EventCategories we want to count
     *   }
     * })
    **/
    count<T extends EventCategoryCountArgs>(
      args?: Subset<T, EventCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventCategoryAggregateArgs>(args: Subset<T, EventCategoryAggregateArgs>): Prisma.PrismaPromise<GetEventCategoryAggregateType<T>>

    /**
     * Group by EventCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCategoryGroupByArgs} args - Group by arguments.
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
      T extends EventCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventCategoryGroupByArgs['orderBy'] }
        : { orderBy?: EventCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventCategory model
   */
  readonly fields: EventCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends EventCategory$eventsArgs<ExtArgs> = {}>(args?: Subset<T, EventCategory$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the EventCategory model
   */
  interface EventCategoryFieldRefs {
    readonly eventCategoryId: FieldRef<"EventCategory", 'BigInt'>
    readonly initials: FieldRef<"EventCategory", 'String'>
    readonly description: FieldRef<"EventCategory", 'String'>
    readonly createdAt: FieldRef<"EventCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"EventCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventCategory findUnique
   */
  export type EventCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventCategory to fetch.
     */
    where: EventCategoryWhereUniqueInput
  }

  /**
   * EventCategory findUniqueOrThrow
   */
  export type EventCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventCategory to fetch.
     */
    where: EventCategoryWhereUniqueInput
  }

  /**
   * EventCategory findFirst
   */
  export type EventCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventCategory to fetch.
     */
    where?: EventCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCategories to fetch.
     */
    orderBy?: EventCategoryOrderByWithRelationInput | EventCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventCategories.
     */
    cursor?: EventCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventCategories.
     */
    distinct?: EventCategoryScalarFieldEnum | EventCategoryScalarFieldEnum[]
  }

  /**
   * EventCategory findFirstOrThrow
   */
  export type EventCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventCategory to fetch.
     */
    where?: EventCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCategories to fetch.
     */
    orderBy?: EventCategoryOrderByWithRelationInput | EventCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventCategories.
     */
    cursor?: EventCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventCategories.
     */
    distinct?: EventCategoryScalarFieldEnum | EventCategoryScalarFieldEnum[]
  }

  /**
   * EventCategory findMany
   */
  export type EventCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventCategories to fetch.
     */
    where?: EventCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCategories to fetch.
     */
    orderBy?: EventCategoryOrderByWithRelationInput | EventCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventCategories.
     */
    cursor?: EventCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCategories.
     */
    skip?: number
    distinct?: EventCategoryScalarFieldEnum | EventCategoryScalarFieldEnum[]
  }

  /**
   * EventCategory create
   */
  export type EventCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a EventCategory.
     */
    data: XOR<EventCategoryCreateInput, EventCategoryUncheckedCreateInput>
  }

  /**
   * EventCategory createMany
   */
  export type EventCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventCategories.
     */
    data: EventCategoryCreateManyInput | EventCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventCategory createManyAndReturn
   */
  export type EventCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many EventCategories.
     */
    data: EventCategoryCreateManyInput | EventCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventCategory update
   */
  export type EventCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a EventCategory.
     */
    data: XOR<EventCategoryUpdateInput, EventCategoryUncheckedUpdateInput>
    /**
     * Choose, which EventCategory to update.
     */
    where: EventCategoryWhereUniqueInput
  }

  /**
   * EventCategory updateMany
   */
  export type EventCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventCategories.
     */
    data: XOR<EventCategoryUpdateManyMutationInput, EventCategoryUncheckedUpdateManyInput>
    /**
     * Filter which EventCategories to update
     */
    where?: EventCategoryWhereInput
    /**
     * Limit how many EventCategories to update.
     */
    limit?: number
  }

  /**
   * EventCategory updateManyAndReturn
   */
  export type EventCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * The data used to update EventCategories.
     */
    data: XOR<EventCategoryUpdateManyMutationInput, EventCategoryUncheckedUpdateManyInput>
    /**
     * Filter which EventCategories to update
     */
    where?: EventCategoryWhereInput
    /**
     * Limit how many EventCategories to update.
     */
    limit?: number
  }

  /**
   * EventCategory upsert
   */
  export type EventCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the EventCategory to update in case it exists.
     */
    where: EventCategoryWhereUniqueInput
    /**
     * In case the EventCategory found by the `where` argument doesn't exist, create a new EventCategory with this data.
     */
    create: XOR<EventCategoryCreateInput, EventCategoryUncheckedCreateInput>
    /**
     * In case the EventCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventCategoryUpdateInput, EventCategoryUncheckedUpdateInput>
  }

  /**
   * EventCategory delete
   */
  export type EventCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
    /**
     * Filter which EventCategory to delete.
     */
    where: EventCategoryWhereUniqueInput
  }

  /**
   * EventCategory deleteMany
   */
  export type EventCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventCategories to delete
     */
    where?: EventCategoryWhereInput
    /**
     * Limit how many EventCategories to delete.
     */
    limit?: number
  }

  /**
   * EventCategory.events
   */
  export type EventCategory$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    where?: EventToCategoryWhereInput
    orderBy?: EventToCategoryOrderByWithRelationInput | EventToCategoryOrderByWithRelationInput[]
    cursor?: EventToCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventToCategoryScalarFieldEnum | EventToCategoryScalarFieldEnum[]
  }

  /**
   * EventCategory without action
   */
  export type EventCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCategory
     */
    select?: EventCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCategory
     */
    omit?: EventCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCategoryInclude<ExtArgs> | null
  }


  /**
   * Model EventToCategory
   */

  export type AggregateEventToCategory = {
    _count: EventToCategoryCountAggregateOutputType | null
    _avg: EventToCategoryAvgAggregateOutputType | null
    _sum: EventToCategorySumAggregateOutputType | null
    _min: EventToCategoryMinAggregateOutputType | null
    _max: EventToCategoryMaxAggregateOutputType | null
  }

  export type EventToCategoryAvgAggregateOutputType = {
    eventId: number | null
    eventCategoryId: number | null
  }

  export type EventToCategorySumAggregateOutputType = {
    eventId: bigint | null
    eventCategoryId: bigint | null
  }

  export type EventToCategoryMinAggregateOutputType = {
    eventId: bigint | null
    eventCategoryId: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventToCategoryMaxAggregateOutputType = {
    eventId: bigint | null
    eventCategoryId: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventToCategoryCountAggregateOutputType = {
    eventId: number
    eventCategoryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventToCategoryAvgAggregateInputType = {
    eventId?: true
    eventCategoryId?: true
  }

  export type EventToCategorySumAggregateInputType = {
    eventId?: true
    eventCategoryId?: true
  }

  export type EventToCategoryMinAggregateInputType = {
    eventId?: true
    eventCategoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventToCategoryMaxAggregateInputType = {
    eventId?: true
    eventCategoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventToCategoryCountAggregateInputType = {
    eventId?: true
    eventCategoryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventToCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventToCategory to aggregate.
     */
    where?: EventToCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventToCategories to fetch.
     */
    orderBy?: EventToCategoryOrderByWithRelationInput | EventToCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventToCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventToCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventToCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventToCategories
    **/
    _count?: true | EventToCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventToCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventToCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventToCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventToCategoryMaxAggregateInputType
  }

  export type GetEventToCategoryAggregateType<T extends EventToCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateEventToCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventToCategory[P]>
      : GetScalarType<T[P], AggregateEventToCategory[P]>
  }




  export type EventToCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventToCategoryWhereInput
    orderBy?: EventToCategoryOrderByWithAggregationInput | EventToCategoryOrderByWithAggregationInput[]
    by: EventToCategoryScalarFieldEnum[] | EventToCategoryScalarFieldEnum
    having?: EventToCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventToCategoryCountAggregateInputType | true
    _avg?: EventToCategoryAvgAggregateInputType
    _sum?: EventToCategorySumAggregateInputType
    _min?: EventToCategoryMinAggregateInputType
    _max?: EventToCategoryMaxAggregateInputType
  }

  export type EventToCategoryGroupByOutputType = {
    eventId: bigint
    eventCategoryId: bigint
    createdAt: Date
    updatedAt: Date
    _count: EventToCategoryCountAggregateOutputType | null
    _avg: EventToCategoryAvgAggregateOutputType | null
    _sum: EventToCategorySumAggregateOutputType | null
    _min: EventToCategoryMinAggregateOutputType | null
    _max: EventToCategoryMaxAggregateOutputType | null
  }

  type GetEventToCategoryGroupByPayload<T extends EventToCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventToCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventToCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventToCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], EventToCategoryGroupByOutputType[P]>
        }
      >
    >


  export type EventToCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventCategoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    category?: boolean | EventCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventToCategory"]>

  export type EventToCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventCategoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    category?: boolean | EventCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventToCategory"]>

  export type EventToCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventCategoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    category?: boolean | EventCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventToCategory"]>

  export type EventToCategorySelectScalar = {
    eventId?: boolean
    eventCategoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventToCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventId" | "eventCategoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["eventToCategory"]>
  export type EventToCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    category?: boolean | EventCategoryDefaultArgs<ExtArgs>
  }
  export type EventToCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    category?: boolean | EventCategoryDefaultArgs<ExtArgs>
  }
  export type EventToCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    category?: boolean | EventCategoryDefaultArgs<ExtArgs>
  }

  export type $EventToCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventToCategory"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      category: Prisma.$EventCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      eventId: bigint
      eventCategoryId: bigint
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventToCategory"]>
    composites: {}
  }

  type EventToCategoryGetPayload<S extends boolean | null | undefined | EventToCategoryDefaultArgs> = $Result.GetResult<Prisma.$EventToCategoryPayload, S>

  type EventToCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventToCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventToCategoryCountAggregateInputType | true
    }

  export interface EventToCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventToCategory'], meta: { name: 'EventToCategory' } }
    /**
     * Find zero or one EventToCategory that matches the filter.
     * @param {EventToCategoryFindUniqueArgs} args - Arguments to find a EventToCategory
     * @example
     * // Get one EventToCategory
     * const eventToCategory = await prisma.eventToCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventToCategoryFindUniqueArgs>(args: SelectSubset<T, EventToCategoryFindUniqueArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventToCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventToCategoryFindUniqueOrThrowArgs} args - Arguments to find a EventToCategory
     * @example
     * // Get one EventToCategory
     * const eventToCategory = await prisma.eventToCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventToCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, EventToCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventToCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryFindFirstArgs} args - Arguments to find a EventToCategory
     * @example
     * // Get one EventToCategory
     * const eventToCategory = await prisma.eventToCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventToCategoryFindFirstArgs>(args?: SelectSubset<T, EventToCategoryFindFirstArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventToCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryFindFirstOrThrowArgs} args - Arguments to find a EventToCategory
     * @example
     * // Get one EventToCategory
     * const eventToCategory = await prisma.eventToCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventToCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, EventToCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventToCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventToCategories
     * const eventToCategories = await prisma.eventToCategory.findMany()
     * 
     * // Get first 10 EventToCategories
     * const eventToCategories = await prisma.eventToCategory.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const eventToCategoryWithEventIdOnly = await prisma.eventToCategory.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends EventToCategoryFindManyArgs>(args?: SelectSubset<T, EventToCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventToCategory.
     * @param {EventToCategoryCreateArgs} args - Arguments to create a EventToCategory.
     * @example
     * // Create one EventToCategory
     * const EventToCategory = await prisma.eventToCategory.create({
     *   data: {
     *     // ... data to create a EventToCategory
     *   }
     * })
     * 
     */
    create<T extends EventToCategoryCreateArgs>(args: SelectSubset<T, EventToCategoryCreateArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventToCategories.
     * @param {EventToCategoryCreateManyArgs} args - Arguments to create many EventToCategories.
     * @example
     * // Create many EventToCategories
     * const eventToCategory = await prisma.eventToCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventToCategoryCreateManyArgs>(args?: SelectSubset<T, EventToCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventToCategories and returns the data saved in the database.
     * @param {EventToCategoryCreateManyAndReturnArgs} args - Arguments to create many EventToCategories.
     * @example
     * // Create many EventToCategories
     * const eventToCategory = await prisma.eventToCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventToCategories and only return the `eventId`
     * const eventToCategoryWithEventIdOnly = await prisma.eventToCategory.createManyAndReturn({
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventToCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, EventToCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventToCategory.
     * @param {EventToCategoryDeleteArgs} args - Arguments to delete one EventToCategory.
     * @example
     * // Delete one EventToCategory
     * const EventToCategory = await prisma.eventToCategory.delete({
     *   where: {
     *     // ... filter to delete one EventToCategory
     *   }
     * })
     * 
     */
    delete<T extends EventToCategoryDeleteArgs>(args: SelectSubset<T, EventToCategoryDeleteArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventToCategory.
     * @param {EventToCategoryUpdateArgs} args - Arguments to update one EventToCategory.
     * @example
     * // Update one EventToCategory
     * const eventToCategory = await prisma.eventToCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventToCategoryUpdateArgs>(args: SelectSubset<T, EventToCategoryUpdateArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventToCategories.
     * @param {EventToCategoryDeleteManyArgs} args - Arguments to filter EventToCategories to delete.
     * @example
     * // Delete a few EventToCategories
     * const { count } = await prisma.eventToCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventToCategoryDeleteManyArgs>(args?: SelectSubset<T, EventToCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventToCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventToCategories
     * const eventToCategory = await prisma.eventToCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventToCategoryUpdateManyArgs>(args: SelectSubset<T, EventToCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventToCategories and returns the data updated in the database.
     * @param {EventToCategoryUpdateManyAndReturnArgs} args - Arguments to update many EventToCategories.
     * @example
     * // Update many EventToCategories
     * const eventToCategory = await prisma.eventToCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventToCategories and only return the `eventId`
     * const eventToCategoryWithEventIdOnly = await prisma.eventToCategory.updateManyAndReturn({
     *   select: { eventId: true },
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
    updateManyAndReturn<T extends EventToCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, EventToCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventToCategory.
     * @param {EventToCategoryUpsertArgs} args - Arguments to update or create a EventToCategory.
     * @example
     * // Update or create a EventToCategory
     * const eventToCategory = await prisma.eventToCategory.upsert({
     *   create: {
     *     // ... data to create a EventToCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventToCategory we want to update
     *   }
     * })
     */
    upsert<T extends EventToCategoryUpsertArgs>(args: SelectSubset<T, EventToCategoryUpsertArgs<ExtArgs>>): Prisma__EventToCategoryClient<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventToCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryCountArgs} args - Arguments to filter EventToCategories to count.
     * @example
     * // Count the number of EventToCategories
     * const count = await prisma.eventToCategory.count({
     *   where: {
     *     // ... the filter for the EventToCategories we want to count
     *   }
     * })
    **/
    count<T extends EventToCategoryCountArgs>(
      args?: Subset<T, EventToCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventToCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventToCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventToCategoryAggregateArgs>(args: Subset<T, EventToCategoryAggregateArgs>): Prisma.PrismaPromise<GetEventToCategoryAggregateType<T>>

    /**
     * Group by EventToCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventToCategoryGroupByArgs} args - Group by arguments.
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
      T extends EventToCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventToCategoryGroupByArgs['orderBy'] }
        : { orderBy?: EventToCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventToCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventToCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventToCategory model
   */
  readonly fields: EventToCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventToCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventToCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends EventCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventCategoryDefaultArgs<ExtArgs>>): Prisma__EventCategoryClient<$Result.GetResult<Prisma.$EventCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EventToCategory model
   */
  interface EventToCategoryFieldRefs {
    readonly eventId: FieldRef<"EventToCategory", 'BigInt'>
    readonly eventCategoryId: FieldRef<"EventToCategory", 'BigInt'>
    readonly createdAt: FieldRef<"EventToCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"EventToCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventToCategory findUnique
   */
  export type EventToCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventToCategory to fetch.
     */
    where: EventToCategoryWhereUniqueInput
  }

  /**
   * EventToCategory findUniqueOrThrow
   */
  export type EventToCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventToCategory to fetch.
     */
    where: EventToCategoryWhereUniqueInput
  }

  /**
   * EventToCategory findFirst
   */
  export type EventToCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventToCategory to fetch.
     */
    where?: EventToCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventToCategories to fetch.
     */
    orderBy?: EventToCategoryOrderByWithRelationInput | EventToCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventToCategories.
     */
    cursor?: EventToCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventToCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventToCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventToCategories.
     */
    distinct?: EventToCategoryScalarFieldEnum | EventToCategoryScalarFieldEnum[]
  }

  /**
   * EventToCategory findFirstOrThrow
   */
  export type EventToCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventToCategory to fetch.
     */
    where?: EventToCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventToCategories to fetch.
     */
    orderBy?: EventToCategoryOrderByWithRelationInput | EventToCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventToCategories.
     */
    cursor?: EventToCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventToCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventToCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventToCategories.
     */
    distinct?: EventToCategoryScalarFieldEnum | EventToCategoryScalarFieldEnum[]
  }

  /**
   * EventToCategory findMany
   */
  export type EventToCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * Filter, which EventToCategories to fetch.
     */
    where?: EventToCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventToCategories to fetch.
     */
    orderBy?: EventToCategoryOrderByWithRelationInput | EventToCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventToCategories.
     */
    cursor?: EventToCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventToCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventToCategories.
     */
    skip?: number
    distinct?: EventToCategoryScalarFieldEnum | EventToCategoryScalarFieldEnum[]
  }

  /**
   * EventToCategory create
   */
  export type EventToCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a EventToCategory.
     */
    data: XOR<EventToCategoryCreateInput, EventToCategoryUncheckedCreateInput>
  }

  /**
   * EventToCategory createMany
   */
  export type EventToCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventToCategories.
     */
    data: EventToCategoryCreateManyInput | EventToCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventToCategory createManyAndReturn
   */
  export type EventToCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many EventToCategories.
     */
    data: EventToCategoryCreateManyInput | EventToCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventToCategory update
   */
  export type EventToCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a EventToCategory.
     */
    data: XOR<EventToCategoryUpdateInput, EventToCategoryUncheckedUpdateInput>
    /**
     * Choose, which EventToCategory to update.
     */
    where: EventToCategoryWhereUniqueInput
  }

  /**
   * EventToCategory updateMany
   */
  export type EventToCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventToCategories.
     */
    data: XOR<EventToCategoryUpdateManyMutationInput, EventToCategoryUncheckedUpdateManyInput>
    /**
     * Filter which EventToCategories to update
     */
    where?: EventToCategoryWhereInput
    /**
     * Limit how many EventToCategories to update.
     */
    limit?: number
  }

  /**
   * EventToCategory updateManyAndReturn
   */
  export type EventToCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * The data used to update EventToCategories.
     */
    data: XOR<EventToCategoryUpdateManyMutationInput, EventToCategoryUncheckedUpdateManyInput>
    /**
     * Filter which EventToCategories to update
     */
    where?: EventToCategoryWhereInput
    /**
     * Limit how many EventToCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventToCategory upsert
   */
  export type EventToCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the EventToCategory to update in case it exists.
     */
    where: EventToCategoryWhereUniqueInput
    /**
     * In case the EventToCategory found by the `where` argument doesn't exist, create a new EventToCategory with this data.
     */
    create: XOR<EventToCategoryCreateInput, EventToCategoryUncheckedCreateInput>
    /**
     * In case the EventToCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventToCategoryUpdateInput, EventToCategoryUncheckedUpdateInput>
  }

  /**
   * EventToCategory delete
   */
  export type EventToCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    /**
     * Filter which EventToCategory to delete.
     */
    where: EventToCategoryWhereUniqueInput
  }

  /**
   * EventToCategory deleteMany
   */
  export type EventToCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventToCategories to delete
     */
    where?: EventToCategoryWhereInput
    /**
     * Limit how many EventToCategories to delete.
     */
    limit?: number
  }

  /**
   * EventToCategory without action
   */
  export type EventToCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Venue
   */

  export type AggregateVenue = {
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  export type VenueAvgAggregateOutputType = {
    venueId: number | null
    eventId: number | null
    capacity: number | null
  }

  export type VenueSumAggregateOutputType = {
    venueId: bigint | null
    eventId: bigint | null
    capacity: number | null
  }

  export type VenueMinAggregateOutputType = {
    venueId: bigint | null
    eventId: bigint | null
    city: string | null
    address: string | null
    addressUrl: string | null
    reference: string | null
    capacity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueMaxAggregateOutputType = {
    venueId: bigint | null
    eventId: bigint | null
    city: string | null
    address: string | null
    addressUrl: string | null
    reference: string | null
    capacity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueCountAggregateOutputType = {
    venueId: number
    eventId: number
    city: number
    address: number
    addressUrl: number
    reference: number
    capacity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VenueAvgAggregateInputType = {
    venueId?: true
    eventId?: true
    capacity?: true
  }

  export type VenueSumAggregateInputType = {
    venueId?: true
    eventId?: true
    capacity?: true
  }

  export type VenueMinAggregateInputType = {
    venueId?: true
    eventId?: true
    city?: true
    address?: true
    addressUrl?: true
    reference?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueMaxAggregateInputType = {
    venueId?: true
    eventId?: true
    city?: true
    address?: true
    addressUrl?: true
    reference?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueCountAggregateInputType = {
    venueId?: true
    eventId?: true
    city?: true
    address?: true
    addressUrl?: true
    reference?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venue to aggregate.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Venues
    **/
    _count?: true | VenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VenueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VenueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VenueMaxAggregateInputType
  }

  export type GetVenueAggregateType<T extends VenueAggregateArgs> = {
        [P in keyof T & keyof AggregateVenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenue[P]>
      : GetScalarType<T[P], AggregateVenue[P]>
  }




  export type VenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueWhereInput
    orderBy?: VenueOrderByWithAggregationInput | VenueOrderByWithAggregationInput[]
    by: VenueScalarFieldEnum[] | VenueScalarFieldEnum
    having?: VenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VenueCountAggregateInputType | true
    _avg?: VenueAvgAggregateInputType
    _sum?: VenueSumAggregateInputType
    _min?: VenueMinAggregateInputType
    _max?: VenueMaxAggregateInputType
  }

  export type VenueGroupByOutputType = {
    venueId: bigint
    eventId: bigint
    city: string | null
    address: string | null
    addressUrl: string | null
    reference: string | null
    capacity: number
    createdAt: Date
    updatedAt: Date
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  type GetVenueGroupByPayload<T extends VenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VenueGroupByOutputType[P]>
            : GetScalarType<T[P], VenueGroupByOutputType[P]>
        }
      >
    >


  export type VenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    venueId?: boolean
    eventId?: boolean
    city?: boolean
    address?: boolean
    addressUrl?: boolean
    reference?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    venueId?: boolean
    eventId?: boolean
    city?: boolean
    address?: boolean
    addressUrl?: boolean
    reference?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    venueId?: boolean
    eventId?: boolean
    city?: boolean
    address?: boolean
    addressUrl?: boolean
    reference?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectScalar = {
    venueId?: boolean
    eventId?: boolean
    city?: boolean
    address?: boolean
    addressUrl?: boolean
    reference?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VenueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"venueId" | "eventId" | "city" | "address" | "addressUrl" | "reference" | "capacity" | "createdAt" | "updatedAt", ExtArgs["result"]["venue"]>
  export type VenueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type VenueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type VenueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $VenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venue"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      venueId: bigint
      eventId: bigint
      city: string | null
      address: string | null
      addressUrl: string | null
      reference: string | null
      capacity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["venue"]>
    composites: {}
  }

  type VenueGetPayload<S extends boolean | null | undefined | VenueDefaultArgs> = $Result.GetResult<Prisma.$VenuePayload, S>

  type VenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VenueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VenueCountAggregateInputType | true
    }

  export interface VenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venue'], meta: { name: 'Venue' } }
    /**
     * Find zero or one Venue that matches the filter.
     * @param {VenueFindUniqueArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VenueFindUniqueArgs>(args: SelectSubset<T, VenueFindUniqueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VenueFindUniqueOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VenueFindUniqueOrThrowArgs>(args: SelectSubset<T, VenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VenueFindFirstArgs>(args?: SelectSubset<T, VenueFindFirstArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VenueFindFirstOrThrowArgs>(args?: SelectSubset<T, VenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Venues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Venues
     * const venues = await prisma.venue.findMany()
     * 
     * // Get first 10 Venues
     * const venues = await prisma.venue.findMany({ take: 10 })
     * 
     * // Only select the `venueId`
     * const venueWithVenueIdOnly = await prisma.venue.findMany({ select: { venueId: true } })
     * 
     */
    findMany<T extends VenueFindManyArgs>(args?: SelectSubset<T, VenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venue.
     * @param {VenueCreateArgs} args - Arguments to create a Venue.
     * @example
     * // Create one Venue
     * const Venue = await prisma.venue.create({
     *   data: {
     *     // ... data to create a Venue
     *   }
     * })
     * 
     */
    create<T extends VenueCreateArgs>(args: SelectSubset<T, VenueCreateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Venues.
     * @param {VenueCreateManyArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VenueCreateManyArgs>(args?: SelectSubset<T, VenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Venues and returns the data saved in the database.
     * @param {VenueCreateManyAndReturnArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Venues and only return the `venueId`
     * const venueWithVenueIdOnly = await prisma.venue.createManyAndReturn({
     *   select: { venueId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VenueCreateManyAndReturnArgs>(args?: SelectSubset<T, VenueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Venue.
     * @param {VenueDeleteArgs} args - Arguments to delete one Venue.
     * @example
     * // Delete one Venue
     * const Venue = await prisma.venue.delete({
     *   where: {
     *     // ... filter to delete one Venue
     *   }
     * })
     * 
     */
    delete<T extends VenueDeleteArgs>(args: SelectSubset<T, VenueDeleteArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venue.
     * @param {VenueUpdateArgs} args - Arguments to update one Venue.
     * @example
     * // Update one Venue
     * const venue = await prisma.venue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VenueUpdateArgs>(args: SelectSubset<T, VenueUpdateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Venues.
     * @param {VenueDeleteManyArgs} args - Arguments to filter Venues to delete.
     * @example
     * // Delete a few Venues
     * const { count } = await prisma.venue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VenueDeleteManyArgs>(args?: SelectSubset<T, VenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VenueUpdateManyArgs>(args: SelectSubset<T, VenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues and returns the data updated in the database.
     * @param {VenueUpdateManyAndReturnArgs} args - Arguments to update many Venues.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Venues and only return the `venueId`
     * const venueWithVenueIdOnly = await prisma.venue.updateManyAndReturn({
     *   select: { venueId: true },
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
    updateManyAndReturn<T extends VenueUpdateManyAndReturnArgs>(args: SelectSubset<T, VenueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Venue.
     * @param {VenueUpsertArgs} args - Arguments to update or create a Venue.
     * @example
     * // Update or create a Venue
     * const venue = await prisma.venue.upsert({
     *   create: {
     *     // ... data to create a Venue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venue we want to update
     *   }
     * })
     */
    upsert<T extends VenueUpsertArgs>(args: SelectSubset<T, VenueUpsertArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueCountArgs} args - Arguments to filter Venues to count.
     * @example
     * // Count the number of Venues
     * const count = await prisma.venue.count({
     *   where: {
     *     // ... the filter for the Venues we want to count
     *   }
     * })
    **/
    count<T extends VenueCountArgs>(
      args?: Subset<T, VenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VenueAggregateArgs>(args: Subset<T, VenueAggregateArgs>): Prisma.PrismaPromise<GetVenueAggregateType<T>>

    /**
     * Group by Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueGroupByArgs} args - Group by arguments.
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
      T extends VenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VenueGroupByArgs['orderBy'] }
        : { orderBy?: VenueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venue model
   */
  readonly fields: VenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Venue model
   */
  interface VenueFieldRefs {
    readonly venueId: FieldRef<"Venue", 'BigInt'>
    readonly eventId: FieldRef<"Venue", 'BigInt'>
    readonly city: FieldRef<"Venue", 'String'>
    readonly address: FieldRef<"Venue", 'String'>
    readonly addressUrl: FieldRef<"Venue", 'String'>
    readonly reference: FieldRef<"Venue", 'String'>
    readonly capacity: FieldRef<"Venue", 'Int'>
    readonly createdAt: FieldRef<"Venue", 'DateTime'>
    readonly updatedAt: FieldRef<"Venue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Venue findUnique
   */
  export type VenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findUniqueOrThrow
   */
  export type VenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findFirst
   */
  export type VenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findFirstOrThrow
   */
  export type VenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findMany
   */
  export type VenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venues to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue create
   */
  export type VenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to create a Venue.
     */
    data: XOR<VenueCreateInput, VenueUncheckedCreateInput>
  }

  /**
   * Venue createMany
   */
  export type VenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue createManyAndReturn
   */
  export type VenueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Venue update
   */
  export type VenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to update a Venue.
     */
    data: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
    /**
     * Choose, which Venue to update.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue updateMany
   */
  export type VenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
  }

  /**
   * Venue updateManyAndReturn
   */
  export type VenueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Venue upsert
   */
  export type VenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The filter to search for the Venue to update in case it exists.
     */
    where: VenueWhereUniqueInput
    /**
     * In case the Venue found by the `where` argument doesn't exist, create a new Venue with this data.
     */
    create: XOR<VenueCreateInput, VenueUncheckedCreateInput>
    /**
     * In case the Venue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
  }

  /**
   * Venue delete
   */
  export type VenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter which Venue to delete.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue deleteMany
   */
  export type VenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venues to delete
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to delete.
     */
    limit?: number
  }

  /**
   * Venue without action
   */
  export type VenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
  }


  /**
   * Model Fee
   */

  export type AggregateFee = {
    _count: FeeCountAggregateOutputType | null
    _avg: FeeAvgAggregateOutputType | null
    _sum: FeeSumAggregateOutputType | null
    _min: FeeMinAggregateOutputType | null
    _max: FeeMaxAggregateOutputType | null
  }

  export type FeeAvgAggregateOutputType = {
    feeId: number | null
    percentage: Decimal | null
  }

  export type FeeSumAggregateOutputType = {
    feeId: bigint | null
    percentage: Decimal | null
  }

  export type FeeMinAggregateOutputType = {
    feeId: bigint | null
    percentage: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeeMaxAggregateOutputType = {
    feeId: bigint | null
    percentage: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeeCountAggregateOutputType = {
    feeId: number
    percentage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeeAvgAggregateInputType = {
    feeId?: true
    percentage?: true
  }

  export type FeeSumAggregateInputType = {
    feeId?: true
    percentage?: true
  }

  export type FeeMinAggregateInputType = {
    feeId?: true
    percentage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeeMaxAggregateInputType = {
    feeId?: true
    percentage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeeCountAggregateInputType = {
    feeId?: true
    percentage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fee to aggregate.
     */
    where?: FeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fees to fetch.
     */
    orderBy?: FeeOrderByWithRelationInput | FeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fees
    **/
    _count?: true | FeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeeMaxAggregateInputType
  }

  export type GetFeeAggregateType<T extends FeeAggregateArgs> = {
        [P in keyof T & keyof AggregateFee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFee[P]>
      : GetScalarType<T[P], AggregateFee[P]>
  }




  export type FeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeeWhereInput
    orderBy?: FeeOrderByWithAggregationInput | FeeOrderByWithAggregationInput[]
    by: FeeScalarFieldEnum[] | FeeScalarFieldEnum
    having?: FeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeeCountAggregateInputType | true
    _avg?: FeeAvgAggregateInputType
    _sum?: FeeSumAggregateInputType
    _min?: FeeMinAggregateInputType
    _max?: FeeMaxAggregateInputType
  }

  export type FeeGroupByOutputType = {
    feeId: bigint
    percentage: Decimal
    createdAt: Date
    updatedAt: Date
    _count: FeeCountAggregateOutputType | null
    _avg: FeeAvgAggregateOutputType | null
    _sum: FeeSumAggregateOutputType | null
    _min: FeeMinAggregateOutputType | null
    _max: FeeMaxAggregateOutputType | null
  }

  type GetFeeGroupByPayload<T extends FeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeeGroupByOutputType[P]>
            : GetScalarType<T[P], FeeGroupByOutputType[P]>
        }
      >
    >


  export type FeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    feeId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | Fee$eventArgs<ExtArgs>
    _count?: boolean | FeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fee"]>

  export type FeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    feeId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fee"]>

  export type FeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    feeId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fee"]>

  export type FeeSelectScalar = {
    feeId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"feeId" | "percentage" | "createdAt" | "updatedAt", ExtArgs["result"]["fee"]>
  export type FeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | Fee$eventArgs<ExtArgs>
    _count?: boolean | FeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fee"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      feeId: bigint
      percentage: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fee"]>
    composites: {}
  }

  type FeeGetPayload<S extends boolean | null | undefined | FeeDefaultArgs> = $Result.GetResult<Prisma.$FeePayload, S>

  type FeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeeCountAggregateInputType | true
    }

  export interface FeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fee'], meta: { name: 'Fee' } }
    /**
     * Find zero or one Fee that matches the filter.
     * @param {FeeFindUniqueArgs} args - Arguments to find a Fee
     * @example
     * // Get one Fee
     * const fee = await prisma.fee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeeFindUniqueArgs>(args: SelectSubset<T, FeeFindUniqueArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeeFindUniqueOrThrowArgs} args - Arguments to find a Fee
     * @example
     * // Get one Fee
     * const fee = await prisma.fee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeeFindUniqueOrThrowArgs>(args: SelectSubset<T, FeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeFindFirstArgs} args - Arguments to find a Fee
     * @example
     * // Get one Fee
     * const fee = await prisma.fee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeeFindFirstArgs>(args?: SelectSubset<T, FeeFindFirstArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeFindFirstOrThrowArgs} args - Arguments to find a Fee
     * @example
     * // Get one Fee
     * const fee = await prisma.fee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeeFindFirstOrThrowArgs>(args?: SelectSubset<T, FeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fees
     * const fees = await prisma.fee.findMany()
     * 
     * // Get first 10 Fees
     * const fees = await prisma.fee.findMany({ take: 10 })
     * 
     * // Only select the `feeId`
     * const feeWithFeeIdOnly = await prisma.fee.findMany({ select: { feeId: true } })
     * 
     */
    findMany<T extends FeeFindManyArgs>(args?: SelectSubset<T, FeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fee.
     * @param {FeeCreateArgs} args - Arguments to create a Fee.
     * @example
     * // Create one Fee
     * const Fee = await prisma.fee.create({
     *   data: {
     *     // ... data to create a Fee
     *   }
     * })
     * 
     */
    create<T extends FeeCreateArgs>(args: SelectSubset<T, FeeCreateArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fees.
     * @param {FeeCreateManyArgs} args - Arguments to create many Fees.
     * @example
     * // Create many Fees
     * const fee = await prisma.fee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeeCreateManyArgs>(args?: SelectSubset<T, FeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fees and returns the data saved in the database.
     * @param {FeeCreateManyAndReturnArgs} args - Arguments to create many Fees.
     * @example
     * // Create many Fees
     * const fee = await prisma.fee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fees and only return the `feeId`
     * const feeWithFeeIdOnly = await prisma.fee.createManyAndReturn({
     *   select: { feeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeeCreateManyAndReturnArgs>(args?: SelectSubset<T, FeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fee.
     * @param {FeeDeleteArgs} args - Arguments to delete one Fee.
     * @example
     * // Delete one Fee
     * const Fee = await prisma.fee.delete({
     *   where: {
     *     // ... filter to delete one Fee
     *   }
     * })
     * 
     */
    delete<T extends FeeDeleteArgs>(args: SelectSubset<T, FeeDeleteArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fee.
     * @param {FeeUpdateArgs} args - Arguments to update one Fee.
     * @example
     * // Update one Fee
     * const fee = await prisma.fee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeeUpdateArgs>(args: SelectSubset<T, FeeUpdateArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fees.
     * @param {FeeDeleteManyArgs} args - Arguments to filter Fees to delete.
     * @example
     * // Delete a few Fees
     * const { count } = await prisma.fee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeeDeleteManyArgs>(args?: SelectSubset<T, FeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fees
     * const fee = await prisma.fee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeeUpdateManyArgs>(args: SelectSubset<T, FeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fees and returns the data updated in the database.
     * @param {FeeUpdateManyAndReturnArgs} args - Arguments to update many Fees.
     * @example
     * // Update many Fees
     * const fee = await prisma.fee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fees and only return the `feeId`
     * const feeWithFeeIdOnly = await prisma.fee.updateManyAndReturn({
     *   select: { feeId: true },
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
    updateManyAndReturn<T extends FeeUpdateManyAndReturnArgs>(args: SelectSubset<T, FeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fee.
     * @param {FeeUpsertArgs} args - Arguments to update or create a Fee.
     * @example
     * // Update or create a Fee
     * const fee = await prisma.fee.upsert({
     *   create: {
     *     // ... data to create a Fee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fee we want to update
     *   }
     * })
     */
    upsert<T extends FeeUpsertArgs>(args: SelectSubset<T, FeeUpsertArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeCountArgs} args - Arguments to filter Fees to count.
     * @example
     * // Count the number of Fees
     * const count = await prisma.fee.count({
     *   where: {
     *     // ... the filter for the Fees we want to count
     *   }
     * })
    **/
    count<T extends FeeCountArgs>(
      args?: Subset<T, FeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeeAggregateArgs>(args: Subset<T, FeeAggregateArgs>): Prisma.PrismaPromise<GetFeeAggregateType<T>>

    /**
     * Group by Fee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeGroupByArgs} args - Group by arguments.
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
      T extends FeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeeGroupByArgs['orderBy'] }
        : { orderBy?: FeeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fee model
   */
  readonly fields: FeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends Fee$eventArgs<ExtArgs> = {}>(args?: Subset<T, Fee$eventArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Fee model
   */
  interface FeeFieldRefs {
    readonly feeId: FieldRef<"Fee", 'BigInt'>
    readonly percentage: FieldRef<"Fee", 'Decimal'>
    readonly createdAt: FieldRef<"Fee", 'DateTime'>
    readonly updatedAt: FieldRef<"Fee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fee findUnique
   */
  export type FeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * Filter, which Fee to fetch.
     */
    where: FeeWhereUniqueInput
  }

  /**
   * Fee findUniqueOrThrow
   */
  export type FeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * Filter, which Fee to fetch.
     */
    where: FeeWhereUniqueInput
  }

  /**
   * Fee findFirst
   */
  export type FeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * Filter, which Fee to fetch.
     */
    where?: FeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fees to fetch.
     */
    orderBy?: FeeOrderByWithRelationInput | FeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fees.
     */
    cursor?: FeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fees.
     */
    distinct?: FeeScalarFieldEnum | FeeScalarFieldEnum[]
  }

  /**
   * Fee findFirstOrThrow
   */
  export type FeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * Filter, which Fee to fetch.
     */
    where?: FeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fees to fetch.
     */
    orderBy?: FeeOrderByWithRelationInput | FeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fees.
     */
    cursor?: FeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fees.
     */
    distinct?: FeeScalarFieldEnum | FeeScalarFieldEnum[]
  }

  /**
   * Fee findMany
   */
  export type FeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * Filter, which Fees to fetch.
     */
    where?: FeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fees to fetch.
     */
    orderBy?: FeeOrderByWithRelationInput | FeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fees.
     */
    cursor?: FeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fees.
     */
    skip?: number
    distinct?: FeeScalarFieldEnum | FeeScalarFieldEnum[]
  }

  /**
   * Fee create
   */
  export type FeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Fee.
     */
    data: XOR<FeeCreateInput, FeeUncheckedCreateInput>
  }

  /**
   * Fee createMany
   */
  export type FeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fees.
     */
    data: FeeCreateManyInput | FeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fee createManyAndReturn
   */
  export type FeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * The data used to create many Fees.
     */
    data: FeeCreateManyInput | FeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fee update
   */
  export type FeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Fee.
     */
    data: XOR<FeeUpdateInput, FeeUncheckedUpdateInput>
    /**
     * Choose, which Fee to update.
     */
    where: FeeWhereUniqueInput
  }

  /**
   * Fee updateMany
   */
  export type FeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fees.
     */
    data: XOR<FeeUpdateManyMutationInput, FeeUncheckedUpdateManyInput>
    /**
     * Filter which Fees to update
     */
    where?: FeeWhereInput
    /**
     * Limit how many Fees to update.
     */
    limit?: number
  }

  /**
   * Fee updateManyAndReturn
   */
  export type FeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * The data used to update Fees.
     */
    data: XOR<FeeUpdateManyMutationInput, FeeUncheckedUpdateManyInput>
    /**
     * Filter which Fees to update
     */
    where?: FeeWhereInput
    /**
     * Limit how many Fees to update.
     */
    limit?: number
  }

  /**
   * Fee upsert
   */
  export type FeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Fee to update in case it exists.
     */
    where: FeeWhereUniqueInput
    /**
     * In case the Fee found by the `where` argument doesn't exist, create a new Fee with this data.
     */
    create: XOR<FeeCreateInput, FeeUncheckedCreateInput>
    /**
     * In case the Fee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeeUpdateInput, FeeUncheckedUpdateInput>
  }

  /**
   * Fee delete
   */
  export type FeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    /**
     * Filter which Fee to delete.
     */
    where: FeeWhereUniqueInput
  }

  /**
   * Fee deleteMany
   */
  export type FeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fees to delete
     */
    where?: FeeWhereInput
    /**
     * Limit how many Fees to delete.
     */
    limit?: number
  }

  /**
   * Fee.event
   */
  export type Fee$eventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Fee without action
   */
  export type FeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    eventId: number | null
    organizerId: number | null
    feeId: number | null
  }

  export type EventSumAggregateOutputType = {
    eventId: bigint | null
    organizerId: bigint | null
    feeId: bigint | null
  }

  export type EventMinAggregateOutputType = {
    eventId: bigint | null
    organizerId: bigint | null
    feeId: bigint | null
    title: string | null
    status: $Enums.EVENT_STATUS | null
    inPerson: boolean | null
    description: string | null
    accessPolicy: $Enums.ACCESS_POLICY | null
    accessPolicyDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    eventId: bigint | null
    organizerId: bigint | null
    feeId: bigint | null
    title: string | null
    status: $Enums.EVENT_STATUS | null
    inPerson: boolean | null
    description: string | null
    accessPolicy: $Enums.ACCESS_POLICY | null
    accessPolicyDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    eventId: number
    organizerId: number
    feeId: number
    title: number
    status: number
    inPerson: number
    description: number
    accessPolicy: number
    accessPolicyDescription: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    eventId?: true
    organizerId?: true
    feeId?: true
  }

  export type EventSumAggregateInputType = {
    eventId?: true
    organizerId?: true
    feeId?: true
  }

  export type EventMinAggregateInputType = {
    eventId?: true
    organizerId?: true
    feeId?: true
    title?: true
    status?: true
    inPerson?: true
    description?: true
    accessPolicy?: true
    accessPolicyDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMaxAggregateInputType = {
    eventId?: true
    organizerId?: true
    feeId?: true
    title?: true
    status?: true
    inPerson?: true
    description?: true
    accessPolicy?: true
    accessPolicyDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCountAggregateInputType = {
    eventId?: true
    organizerId?: true
    feeId?: true
    title?: true
    status?: true
    inPerson?: true
    description?: true
    accessPolicy?: true
    accessPolicyDescription?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    eventId: bigint
    organizerId: bigint
    feeId: bigint | null
    title: string
    status: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription: string | null
    createdAt: Date
    updatedAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    organizerId?: boolean
    feeId?: boolean
    title?: boolean
    status?: boolean
    inPerson?: boolean
    description?: boolean
    accessPolicy?: boolean
    accessPolicyDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
    fee?: boolean | Event$feeArgs<ExtArgs>
    categories?: boolean | Event$categoriesArgs<ExtArgs>
    dates?: boolean | Event$datesArgs<ExtArgs>
    salesPhases?: boolean | Event$salesPhasesArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    organizerId?: boolean
    feeId?: boolean
    title?: boolean
    status?: boolean
    inPerson?: boolean
    description?: boolean
    accessPolicy?: boolean
    accessPolicyDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
    fee?: boolean | Event$feeArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    organizerId?: boolean
    feeId?: boolean
    title?: boolean
    status?: boolean
    inPerson?: boolean
    description?: boolean
    accessPolicy?: boolean
    accessPolicyDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
    fee?: boolean | Event$feeArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    eventId?: boolean
    organizerId?: boolean
    feeId?: boolean
    title?: boolean
    status?: boolean
    inPerson?: boolean
    description?: boolean
    accessPolicy?: boolean
    accessPolicyDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventId" | "organizerId" | "feeId" | "title" | "status" | "inPerson" | "description" | "accessPolicy" | "accessPolicyDescription" | "createdAt" | "updatedAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
    fee?: boolean | Event$feeArgs<ExtArgs>
    categories?: boolean | Event$categoriesArgs<ExtArgs>
    dates?: boolean | Event$datesArgs<ExtArgs>
    salesPhases?: boolean | Event$salesPhasesArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
    fee?: boolean | Event$feeArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
    fee?: boolean | Event$feeArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      organizer: Prisma.$OrganizerPayload<ExtArgs>
      venue: Prisma.$VenuePayload<ExtArgs> | null
      fee: Prisma.$FeePayload<ExtArgs> | null
      categories: Prisma.$EventToCategoryPayload<ExtArgs>[]
      dates: Prisma.$EventDatePayload<ExtArgs>[]
      salesPhases: Prisma.$EventSalesPhasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      eventId: bigint
      organizerId: bigint
      feeId: bigint | null
      title: string
      status: $Enums.EVENT_STATUS
      inPerson: boolean
      description: string
      accessPolicy: $Enums.ACCESS_POLICY
      accessPolicyDescription: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const eventWithEventIdOnly = await prisma.event.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `eventId`
     * const eventWithEventIdOnly = await prisma.event.createManyAndReturn({
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `eventId`
     * const eventWithEventIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { eventId: true },
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
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
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
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizer<T extends OrganizerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizerDefaultArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    venue<T extends Event$venueArgs<ExtArgs> = {}>(args?: Subset<T, Event$venueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fee<T extends Event$feeArgs<ExtArgs> = {}>(args?: Subset<T, Event$feeArgs<ExtArgs>>): Prisma__FeeClient<$Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    categories<T extends Event$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Event$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventToCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dates<T extends Event$datesArgs<ExtArgs> = {}>(args?: Subset<T, Event$datesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    salesPhases<T extends Event$salesPhasesArgs<ExtArgs> = {}>(args?: Subset<T, Event$salesPhasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly eventId: FieldRef<"Event", 'BigInt'>
    readonly organizerId: FieldRef<"Event", 'BigInt'>
    readonly feeId: FieldRef<"Event", 'BigInt'>
    readonly title: FieldRef<"Event", 'String'>
    readonly status: FieldRef<"Event", 'EVENT_STATUS'>
    readonly inPerson: FieldRef<"Event", 'Boolean'>
    readonly description: FieldRef<"Event", 'String'>
    readonly accessPolicy: FieldRef<"Event", 'ACCESS_POLICY'>
    readonly accessPolicyDescription: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.venue
   */
  export type Event$venueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    where?: VenueWhereInput
  }

  /**
   * Event.fee
   */
  export type Event$feeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: FeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fee
     */
    omit?: FeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeeInclude<ExtArgs> | null
    where?: FeeWhereInput
  }

  /**
   * Event.categories
   */
  export type Event$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventToCategory
     */
    select?: EventToCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventToCategory
     */
    omit?: EventToCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventToCategoryInclude<ExtArgs> | null
    where?: EventToCategoryWhereInput
    orderBy?: EventToCategoryOrderByWithRelationInput | EventToCategoryOrderByWithRelationInput[]
    cursor?: EventToCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventToCategoryScalarFieldEnum | EventToCategoryScalarFieldEnum[]
  }

  /**
   * Event.dates
   */
  export type Event$datesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    where?: EventDateWhereInput
    orderBy?: EventDateOrderByWithRelationInput | EventDateOrderByWithRelationInput[]
    cursor?: EventDateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDateScalarFieldEnum | EventDateScalarFieldEnum[]
  }

  /**
   * Event.salesPhases
   */
  export type Event$salesPhasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    where?: EventSalesPhaseWhereInput
    orderBy?: EventSalesPhaseOrderByWithRelationInput | EventSalesPhaseOrderByWithRelationInput[]
    cursor?: EventSalesPhaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventSalesPhaseScalarFieldEnum | EventSalesPhaseScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model EventDate
   */

  export type AggregateEventDate = {
    _count: EventDateCountAggregateOutputType | null
    _avg: EventDateAvgAggregateOutputType | null
    _sum: EventDateSumAggregateOutputType | null
    _min: EventDateMinAggregateOutputType | null
    _max: EventDateMaxAggregateOutputType | null
  }

  export type EventDateAvgAggregateOutputType = {
    eventDateId: number | null
    eventId: number | null
  }

  export type EventDateSumAggregateOutputType = {
    eventDateId: bigint | null
    eventId: bigint | null
  }

  export type EventDateMinAggregateOutputType = {
    eventDateId: bigint | null
    eventId: bigint | null
    startAt: Date | null
    endAt: Date | null
  }

  export type EventDateMaxAggregateOutputType = {
    eventDateId: bigint | null
    eventId: bigint | null
    startAt: Date | null
    endAt: Date | null
  }

  export type EventDateCountAggregateOutputType = {
    eventDateId: number
    eventId: number
    startAt: number
    endAt: number
    _all: number
  }


  export type EventDateAvgAggregateInputType = {
    eventDateId?: true
    eventId?: true
  }

  export type EventDateSumAggregateInputType = {
    eventDateId?: true
    eventId?: true
  }

  export type EventDateMinAggregateInputType = {
    eventDateId?: true
    eventId?: true
    startAt?: true
    endAt?: true
  }

  export type EventDateMaxAggregateInputType = {
    eventDateId?: true
    eventId?: true
    startAt?: true
    endAt?: true
  }

  export type EventDateCountAggregateInputType = {
    eventDateId?: true
    eventId?: true
    startAt?: true
    endAt?: true
    _all?: true
  }

  export type EventDateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDate to aggregate.
     */
    where?: EventDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDates to fetch.
     */
    orderBy?: EventDateOrderByWithRelationInput | EventDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventDates
    **/
    _count?: true | EventDateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventDateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventDateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventDateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventDateMaxAggregateInputType
  }

  export type GetEventDateAggregateType<T extends EventDateAggregateArgs> = {
        [P in keyof T & keyof AggregateEventDate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventDate[P]>
      : GetScalarType<T[P], AggregateEventDate[P]>
  }




  export type EventDateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDateWhereInput
    orderBy?: EventDateOrderByWithAggregationInput | EventDateOrderByWithAggregationInput[]
    by: EventDateScalarFieldEnum[] | EventDateScalarFieldEnum
    having?: EventDateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventDateCountAggregateInputType | true
    _avg?: EventDateAvgAggregateInputType
    _sum?: EventDateSumAggregateInputType
    _min?: EventDateMinAggregateInputType
    _max?: EventDateMaxAggregateInputType
  }

  export type EventDateGroupByOutputType = {
    eventDateId: bigint
    eventId: bigint
    startAt: Date
    endAt: Date
    _count: EventDateCountAggregateOutputType | null
    _avg: EventDateAvgAggregateOutputType | null
    _sum: EventDateSumAggregateOutputType | null
    _min: EventDateMinAggregateOutputType | null
    _max: EventDateMaxAggregateOutputType | null
  }

  type GetEventDateGroupByPayload<T extends EventDateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventDateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventDateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventDateGroupByOutputType[P]>
            : GetScalarType<T[P], EventDateGroupByOutputType[P]>
        }
      >
    >


  export type EventDateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateId?: boolean
    eventId?: boolean
    startAt?: boolean
    endAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    zoneDates?: boolean | EventDate$zoneDatesArgs<ExtArgs>
    _count?: boolean | EventDateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDate"]>

  export type EventDateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateId?: boolean
    eventId?: boolean
    startAt?: boolean
    endAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDate"]>

  export type EventDateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateId?: boolean
    eventId?: boolean
    startAt?: boolean
    endAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDate"]>

  export type EventDateSelectScalar = {
    eventDateId?: boolean
    eventId?: boolean
    startAt?: boolean
    endAt?: boolean
  }

  export type EventDateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventDateId" | "eventId" | "startAt" | "endAt", ExtArgs["result"]["eventDate"]>
  export type EventDateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    zoneDates?: boolean | EventDate$zoneDatesArgs<ExtArgs>
    _count?: boolean | EventDateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventDateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventDateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $EventDatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventDate"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      zoneDates: Prisma.$EventDateZonePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      eventDateId: bigint
      eventId: bigint
      startAt: Date
      endAt: Date
    }, ExtArgs["result"]["eventDate"]>
    composites: {}
  }

  type EventDateGetPayload<S extends boolean | null | undefined | EventDateDefaultArgs> = $Result.GetResult<Prisma.$EventDatePayload, S>

  type EventDateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventDateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventDateCountAggregateInputType | true
    }

  export interface EventDateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventDate'], meta: { name: 'EventDate' } }
    /**
     * Find zero or one EventDate that matches the filter.
     * @param {EventDateFindUniqueArgs} args - Arguments to find a EventDate
     * @example
     * // Get one EventDate
     * const eventDate = await prisma.eventDate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventDateFindUniqueArgs>(args: SelectSubset<T, EventDateFindUniqueArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventDate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventDateFindUniqueOrThrowArgs} args - Arguments to find a EventDate
     * @example
     * // Get one EventDate
     * const eventDate = await prisma.eventDate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventDateFindUniqueOrThrowArgs>(args: SelectSubset<T, EventDateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateFindFirstArgs} args - Arguments to find a EventDate
     * @example
     * // Get one EventDate
     * const eventDate = await prisma.eventDate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventDateFindFirstArgs>(args?: SelectSubset<T, EventDateFindFirstArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateFindFirstOrThrowArgs} args - Arguments to find a EventDate
     * @example
     * // Get one EventDate
     * const eventDate = await prisma.eventDate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventDateFindFirstOrThrowArgs>(args?: SelectSubset<T, EventDateFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventDates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventDates
     * const eventDates = await prisma.eventDate.findMany()
     * 
     * // Get first 10 EventDates
     * const eventDates = await prisma.eventDate.findMany({ take: 10 })
     * 
     * // Only select the `eventDateId`
     * const eventDateWithEventDateIdOnly = await prisma.eventDate.findMany({ select: { eventDateId: true } })
     * 
     */
    findMany<T extends EventDateFindManyArgs>(args?: SelectSubset<T, EventDateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventDate.
     * @param {EventDateCreateArgs} args - Arguments to create a EventDate.
     * @example
     * // Create one EventDate
     * const EventDate = await prisma.eventDate.create({
     *   data: {
     *     // ... data to create a EventDate
     *   }
     * })
     * 
     */
    create<T extends EventDateCreateArgs>(args: SelectSubset<T, EventDateCreateArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventDates.
     * @param {EventDateCreateManyArgs} args - Arguments to create many EventDates.
     * @example
     * // Create many EventDates
     * const eventDate = await prisma.eventDate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventDateCreateManyArgs>(args?: SelectSubset<T, EventDateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventDates and returns the data saved in the database.
     * @param {EventDateCreateManyAndReturnArgs} args - Arguments to create many EventDates.
     * @example
     * // Create many EventDates
     * const eventDate = await prisma.eventDate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventDates and only return the `eventDateId`
     * const eventDateWithEventDateIdOnly = await prisma.eventDate.createManyAndReturn({
     *   select: { eventDateId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventDateCreateManyAndReturnArgs>(args?: SelectSubset<T, EventDateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventDate.
     * @param {EventDateDeleteArgs} args - Arguments to delete one EventDate.
     * @example
     * // Delete one EventDate
     * const EventDate = await prisma.eventDate.delete({
     *   where: {
     *     // ... filter to delete one EventDate
     *   }
     * })
     * 
     */
    delete<T extends EventDateDeleteArgs>(args: SelectSubset<T, EventDateDeleteArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventDate.
     * @param {EventDateUpdateArgs} args - Arguments to update one EventDate.
     * @example
     * // Update one EventDate
     * const eventDate = await prisma.eventDate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventDateUpdateArgs>(args: SelectSubset<T, EventDateUpdateArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventDates.
     * @param {EventDateDeleteManyArgs} args - Arguments to filter EventDates to delete.
     * @example
     * // Delete a few EventDates
     * const { count } = await prisma.eventDate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDateDeleteManyArgs>(args?: SelectSubset<T, EventDateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventDates
     * const eventDate = await prisma.eventDate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventDateUpdateManyArgs>(args: SelectSubset<T, EventDateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDates and returns the data updated in the database.
     * @param {EventDateUpdateManyAndReturnArgs} args - Arguments to update many EventDates.
     * @example
     * // Update many EventDates
     * const eventDate = await prisma.eventDate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventDates and only return the `eventDateId`
     * const eventDateWithEventDateIdOnly = await prisma.eventDate.updateManyAndReturn({
     *   select: { eventDateId: true },
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
    updateManyAndReturn<T extends EventDateUpdateManyAndReturnArgs>(args: SelectSubset<T, EventDateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventDate.
     * @param {EventDateUpsertArgs} args - Arguments to update or create a EventDate.
     * @example
     * // Update or create a EventDate
     * const eventDate = await prisma.eventDate.upsert({
     *   create: {
     *     // ... data to create a EventDate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventDate we want to update
     *   }
     * })
     */
    upsert<T extends EventDateUpsertArgs>(args: SelectSubset<T, EventDateUpsertArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateCountArgs} args - Arguments to filter EventDates to count.
     * @example
     * // Count the number of EventDates
     * const count = await prisma.eventDate.count({
     *   where: {
     *     // ... the filter for the EventDates we want to count
     *   }
     * })
    **/
    count<T extends EventDateCountArgs>(
      args?: Subset<T, EventDateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventDateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventDate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventDateAggregateArgs>(args: Subset<T, EventDateAggregateArgs>): Prisma.PrismaPromise<GetEventDateAggregateType<T>>

    /**
     * Group by EventDate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateGroupByArgs} args - Group by arguments.
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
      T extends EventDateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventDateGroupByArgs['orderBy'] }
        : { orderBy?: EventDateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventDateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventDateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventDate model
   */
  readonly fields: EventDateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventDate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventDateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    zoneDates<T extends EventDate$zoneDatesArgs<ExtArgs> = {}>(args?: Subset<T, EventDate$zoneDatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the EventDate model
   */
  interface EventDateFieldRefs {
    readonly eventDateId: FieldRef<"EventDate", 'BigInt'>
    readonly eventId: FieldRef<"EventDate", 'BigInt'>
    readonly startAt: FieldRef<"EventDate", 'DateTime'>
    readonly endAt: FieldRef<"EventDate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventDate findUnique
   */
  export type EventDateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * Filter, which EventDate to fetch.
     */
    where: EventDateWhereUniqueInput
  }

  /**
   * EventDate findUniqueOrThrow
   */
  export type EventDateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * Filter, which EventDate to fetch.
     */
    where: EventDateWhereUniqueInput
  }

  /**
   * EventDate findFirst
   */
  export type EventDateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * Filter, which EventDate to fetch.
     */
    where?: EventDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDates to fetch.
     */
    orderBy?: EventDateOrderByWithRelationInput | EventDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDates.
     */
    cursor?: EventDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDates.
     */
    distinct?: EventDateScalarFieldEnum | EventDateScalarFieldEnum[]
  }

  /**
   * EventDate findFirstOrThrow
   */
  export type EventDateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * Filter, which EventDate to fetch.
     */
    where?: EventDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDates to fetch.
     */
    orderBy?: EventDateOrderByWithRelationInput | EventDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDates.
     */
    cursor?: EventDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDates.
     */
    distinct?: EventDateScalarFieldEnum | EventDateScalarFieldEnum[]
  }

  /**
   * EventDate findMany
   */
  export type EventDateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * Filter, which EventDates to fetch.
     */
    where?: EventDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDates to fetch.
     */
    orderBy?: EventDateOrderByWithRelationInput | EventDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventDates.
     */
    cursor?: EventDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDates.
     */
    skip?: number
    distinct?: EventDateScalarFieldEnum | EventDateScalarFieldEnum[]
  }

  /**
   * EventDate create
   */
  export type EventDateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * The data needed to create a EventDate.
     */
    data: XOR<EventDateCreateInput, EventDateUncheckedCreateInput>
  }

  /**
   * EventDate createMany
   */
  export type EventDateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventDates.
     */
    data: EventDateCreateManyInput | EventDateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventDate createManyAndReturn
   */
  export type EventDateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * The data used to create many EventDates.
     */
    data: EventDateCreateManyInput | EventDateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDate update
   */
  export type EventDateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * The data needed to update a EventDate.
     */
    data: XOR<EventDateUpdateInput, EventDateUncheckedUpdateInput>
    /**
     * Choose, which EventDate to update.
     */
    where: EventDateWhereUniqueInput
  }

  /**
   * EventDate updateMany
   */
  export type EventDateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventDates.
     */
    data: XOR<EventDateUpdateManyMutationInput, EventDateUncheckedUpdateManyInput>
    /**
     * Filter which EventDates to update
     */
    where?: EventDateWhereInput
    /**
     * Limit how many EventDates to update.
     */
    limit?: number
  }

  /**
   * EventDate updateManyAndReturn
   */
  export type EventDateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * The data used to update EventDates.
     */
    data: XOR<EventDateUpdateManyMutationInput, EventDateUncheckedUpdateManyInput>
    /**
     * Filter which EventDates to update
     */
    where?: EventDateWhereInput
    /**
     * Limit how many EventDates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDate upsert
   */
  export type EventDateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * The filter to search for the EventDate to update in case it exists.
     */
    where: EventDateWhereUniqueInput
    /**
     * In case the EventDate found by the `where` argument doesn't exist, create a new EventDate with this data.
     */
    create: XOR<EventDateCreateInput, EventDateUncheckedCreateInput>
    /**
     * In case the EventDate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventDateUpdateInput, EventDateUncheckedUpdateInput>
  }

  /**
   * EventDate delete
   */
  export type EventDateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
    /**
     * Filter which EventDate to delete.
     */
    where: EventDateWhereUniqueInput
  }

  /**
   * EventDate deleteMany
   */
  export type EventDateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDates to delete
     */
    where?: EventDateWhereInput
    /**
     * Limit how many EventDates to delete.
     */
    limit?: number
  }

  /**
   * EventDate.zoneDates
   */
  export type EventDate$zoneDatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    where?: EventDateZoneWhereInput
    orderBy?: EventDateZoneOrderByWithRelationInput | EventDateZoneOrderByWithRelationInput[]
    cursor?: EventDateZoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDateZoneScalarFieldEnum | EventDateZoneScalarFieldEnum[]
  }

  /**
   * EventDate without action
   */
  export type EventDateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDate
     */
    select?: EventDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDate
     */
    omit?: EventDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateInclude<ExtArgs> | null
  }


  /**
   * Model EventDateZone
   */

  export type AggregateEventDateZone = {
    _count: EventDateZoneCountAggregateOutputType | null
    _avg: EventDateZoneAvgAggregateOutputType | null
    _sum: EventDateZoneSumAggregateOutputType | null
    _min: EventDateZoneMinAggregateOutputType | null
    _max: EventDateZoneMaxAggregateOutputType | null
  }

  export type EventDateZoneAvgAggregateOutputType = {
    eventDateZoneId: number | null
    eventDateId: number | null
    basePrice: Decimal | null
    capacity: number | null
    capacityRemaining: number | null
    seatMapId: number | null
  }

  export type EventDateZoneSumAggregateOutputType = {
    eventDateZoneId: bigint | null
    eventDateId: bigint | null
    basePrice: Decimal | null
    capacity: number | null
    capacityRemaining: number | null
    seatMapId: bigint | null
  }

  export type EventDateZoneMinAggregateOutputType = {
    eventDateZoneId: bigint | null
    eventDateId: bigint | null
    name: string | null
    kind: $Enums.ZONE_KIND | null
    basePrice: Decimal | null
    capacity: number | null
    capacityRemaining: number | null
    seatMapId: bigint | null
    currency: $Enums.CURRENCY | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDateZoneMaxAggregateOutputType = {
    eventDateZoneId: bigint | null
    eventDateId: bigint | null
    name: string | null
    kind: $Enums.ZONE_KIND | null
    basePrice: Decimal | null
    capacity: number | null
    capacityRemaining: number | null
    seatMapId: bigint | null
    currency: $Enums.CURRENCY | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDateZoneCountAggregateOutputType = {
    eventDateZoneId: number
    eventDateId: number
    name: number
    kind: number
    basePrice: number
    capacity: number
    capacityRemaining: number
    seatMapId: number
    currency: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventDateZoneAvgAggregateInputType = {
    eventDateZoneId?: true
    eventDateId?: true
    basePrice?: true
    capacity?: true
    capacityRemaining?: true
    seatMapId?: true
  }

  export type EventDateZoneSumAggregateInputType = {
    eventDateZoneId?: true
    eventDateId?: true
    basePrice?: true
    capacity?: true
    capacityRemaining?: true
    seatMapId?: true
  }

  export type EventDateZoneMinAggregateInputType = {
    eventDateZoneId?: true
    eventDateId?: true
    name?: true
    kind?: true
    basePrice?: true
    capacity?: true
    capacityRemaining?: true
    seatMapId?: true
    currency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDateZoneMaxAggregateInputType = {
    eventDateZoneId?: true
    eventDateId?: true
    name?: true
    kind?: true
    basePrice?: true
    capacity?: true
    capacityRemaining?: true
    seatMapId?: true
    currency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDateZoneCountAggregateInputType = {
    eventDateZoneId?: true
    eventDateId?: true
    name?: true
    kind?: true
    basePrice?: true
    capacity?: true
    capacityRemaining?: true
    seatMapId?: true
    currency?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventDateZoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDateZone to aggregate.
     */
    where?: EventDateZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZones to fetch.
     */
    orderBy?: EventDateZoneOrderByWithRelationInput | EventDateZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventDateZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventDateZones
    **/
    _count?: true | EventDateZoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventDateZoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventDateZoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventDateZoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventDateZoneMaxAggregateInputType
  }

  export type GetEventDateZoneAggregateType<T extends EventDateZoneAggregateArgs> = {
        [P in keyof T & keyof AggregateEventDateZone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventDateZone[P]>
      : GetScalarType<T[P], AggregateEventDateZone[P]>
  }




  export type EventDateZoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDateZoneWhereInput
    orderBy?: EventDateZoneOrderByWithAggregationInput | EventDateZoneOrderByWithAggregationInput[]
    by: EventDateZoneScalarFieldEnum[] | EventDateZoneScalarFieldEnum
    having?: EventDateZoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventDateZoneCountAggregateInputType | true
    _avg?: EventDateZoneAvgAggregateInputType
    _sum?: EventDateZoneSumAggregateInputType
    _min?: EventDateZoneMinAggregateInputType
    _max?: EventDateZoneMaxAggregateInputType
  }

  export type EventDateZoneGroupByOutputType = {
    eventDateZoneId: bigint
    eventDateId: bigint
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal
    capacity: number
    capacityRemaining: number
    seatMapId: bigint | null
    currency: $Enums.CURRENCY
    createdAt: Date
    updatedAt: Date
    _count: EventDateZoneCountAggregateOutputType | null
    _avg: EventDateZoneAvgAggregateOutputType | null
    _sum: EventDateZoneSumAggregateOutputType | null
    _min: EventDateZoneMinAggregateOutputType | null
    _max: EventDateZoneMaxAggregateOutputType | null
  }

  type GetEventDateZoneGroupByPayload<T extends EventDateZoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventDateZoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventDateZoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventDateZoneGroupByOutputType[P]>
            : GetScalarType<T[P], EventDateZoneGroupByOutputType[P]>
        }
      >
    >


  export type EventDateZoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateZoneId?: boolean
    eventDateId?: boolean
    name?: boolean
    kind?: boolean
    basePrice?: boolean
    capacity?: boolean
    capacityRemaining?: boolean
    seatMapId?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventDate?: boolean | EventDateDefaultArgs<ExtArgs>
    seatMap?: boolean | EventDateZone$seatMapArgs<ExtArgs>
    allocations?: boolean | EventDateZone$allocationsArgs<ExtArgs>
    _count?: boolean | EventDateZoneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDateZone"]>

  export type EventDateZoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateZoneId?: boolean
    eventDateId?: boolean
    name?: boolean
    kind?: boolean
    basePrice?: boolean
    capacity?: boolean
    capacityRemaining?: boolean
    seatMapId?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventDate?: boolean | EventDateDefaultArgs<ExtArgs>
    seatMap?: boolean | EventDateZone$seatMapArgs<ExtArgs>
  }, ExtArgs["result"]["eventDateZone"]>

  export type EventDateZoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateZoneId?: boolean
    eventDateId?: boolean
    name?: boolean
    kind?: boolean
    basePrice?: boolean
    capacity?: boolean
    capacityRemaining?: boolean
    seatMapId?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventDate?: boolean | EventDateDefaultArgs<ExtArgs>
    seatMap?: boolean | EventDateZone$seatMapArgs<ExtArgs>
  }, ExtArgs["result"]["eventDateZone"]>

  export type EventDateZoneSelectScalar = {
    eventDateZoneId?: boolean
    eventDateId?: boolean
    name?: boolean
    kind?: boolean
    basePrice?: boolean
    capacity?: boolean
    capacityRemaining?: boolean
    seatMapId?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventDateZoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventDateZoneId" | "eventDateId" | "name" | "kind" | "basePrice" | "capacity" | "capacityRemaining" | "seatMapId" | "currency" | "createdAt" | "updatedAt", ExtArgs["result"]["eventDateZone"]>
  export type EventDateZoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventDate?: boolean | EventDateDefaultArgs<ExtArgs>
    seatMap?: boolean | EventDateZone$seatMapArgs<ExtArgs>
    allocations?: boolean | EventDateZone$allocationsArgs<ExtArgs>
    _count?: boolean | EventDateZoneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventDateZoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventDate?: boolean | EventDateDefaultArgs<ExtArgs>
    seatMap?: boolean | EventDateZone$seatMapArgs<ExtArgs>
  }
  export type EventDateZoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventDate?: boolean | EventDateDefaultArgs<ExtArgs>
    seatMap?: boolean | EventDateZone$seatMapArgs<ExtArgs>
  }

  export type $EventDateZonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventDateZone"
    objects: {
      eventDate: Prisma.$EventDatePayload<ExtArgs>
      seatMap: Prisma.$SeatMapPayload<ExtArgs> | null
      allocations: Prisma.$EventDateZoneAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      eventDateZoneId: bigint
      eventDateId: bigint
      name: string
      kind: $Enums.ZONE_KIND
      basePrice: Prisma.Decimal
      capacity: number
      capacityRemaining: number
      seatMapId: bigint | null
      currency: $Enums.CURRENCY
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventDateZone"]>
    composites: {}
  }

  type EventDateZoneGetPayload<S extends boolean | null | undefined | EventDateZoneDefaultArgs> = $Result.GetResult<Prisma.$EventDateZonePayload, S>

  type EventDateZoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventDateZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventDateZoneCountAggregateInputType | true
    }

  export interface EventDateZoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventDateZone'], meta: { name: 'EventDateZone' } }
    /**
     * Find zero or one EventDateZone that matches the filter.
     * @param {EventDateZoneFindUniqueArgs} args - Arguments to find a EventDateZone
     * @example
     * // Get one EventDateZone
     * const eventDateZone = await prisma.eventDateZone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventDateZoneFindUniqueArgs>(args: SelectSubset<T, EventDateZoneFindUniqueArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventDateZone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventDateZoneFindUniqueOrThrowArgs} args - Arguments to find a EventDateZone
     * @example
     * // Get one EventDateZone
     * const eventDateZone = await prisma.eventDateZone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventDateZoneFindUniqueOrThrowArgs>(args: SelectSubset<T, EventDateZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDateZone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneFindFirstArgs} args - Arguments to find a EventDateZone
     * @example
     * // Get one EventDateZone
     * const eventDateZone = await prisma.eventDateZone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventDateZoneFindFirstArgs>(args?: SelectSubset<T, EventDateZoneFindFirstArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDateZone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneFindFirstOrThrowArgs} args - Arguments to find a EventDateZone
     * @example
     * // Get one EventDateZone
     * const eventDateZone = await prisma.eventDateZone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventDateZoneFindFirstOrThrowArgs>(args?: SelectSubset<T, EventDateZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventDateZones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventDateZones
     * const eventDateZones = await prisma.eventDateZone.findMany()
     * 
     * // Get first 10 EventDateZones
     * const eventDateZones = await prisma.eventDateZone.findMany({ take: 10 })
     * 
     * // Only select the `eventDateZoneId`
     * const eventDateZoneWithEventDateZoneIdOnly = await prisma.eventDateZone.findMany({ select: { eventDateZoneId: true } })
     * 
     */
    findMany<T extends EventDateZoneFindManyArgs>(args?: SelectSubset<T, EventDateZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventDateZone.
     * @param {EventDateZoneCreateArgs} args - Arguments to create a EventDateZone.
     * @example
     * // Create one EventDateZone
     * const EventDateZone = await prisma.eventDateZone.create({
     *   data: {
     *     // ... data to create a EventDateZone
     *   }
     * })
     * 
     */
    create<T extends EventDateZoneCreateArgs>(args: SelectSubset<T, EventDateZoneCreateArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventDateZones.
     * @param {EventDateZoneCreateManyArgs} args - Arguments to create many EventDateZones.
     * @example
     * // Create many EventDateZones
     * const eventDateZone = await prisma.eventDateZone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventDateZoneCreateManyArgs>(args?: SelectSubset<T, EventDateZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventDateZones and returns the data saved in the database.
     * @param {EventDateZoneCreateManyAndReturnArgs} args - Arguments to create many EventDateZones.
     * @example
     * // Create many EventDateZones
     * const eventDateZone = await prisma.eventDateZone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventDateZones and only return the `eventDateZoneId`
     * const eventDateZoneWithEventDateZoneIdOnly = await prisma.eventDateZone.createManyAndReturn({
     *   select: { eventDateZoneId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventDateZoneCreateManyAndReturnArgs>(args?: SelectSubset<T, EventDateZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventDateZone.
     * @param {EventDateZoneDeleteArgs} args - Arguments to delete one EventDateZone.
     * @example
     * // Delete one EventDateZone
     * const EventDateZone = await prisma.eventDateZone.delete({
     *   where: {
     *     // ... filter to delete one EventDateZone
     *   }
     * })
     * 
     */
    delete<T extends EventDateZoneDeleteArgs>(args: SelectSubset<T, EventDateZoneDeleteArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventDateZone.
     * @param {EventDateZoneUpdateArgs} args - Arguments to update one EventDateZone.
     * @example
     * // Update one EventDateZone
     * const eventDateZone = await prisma.eventDateZone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventDateZoneUpdateArgs>(args: SelectSubset<T, EventDateZoneUpdateArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventDateZones.
     * @param {EventDateZoneDeleteManyArgs} args - Arguments to filter EventDateZones to delete.
     * @example
     * // Delete a few EventDateZones
     * const { count } = await prisma.eventDateZone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDateZoneDeleteManyArgs>(args?: SelectSubset<T, EventDateZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDateZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventDateZones
     * const eventDateZone = await prisma.eventDateZone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventDateZoneUpdateManyArgs>(args: SelectSubset<T, EventDateZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDateZones and returns the data updated in the database.
     * @param {EventDateZoneUpdateManyAndReturnArgs} args - Arguments to update many EventDateZones.
     * @example
     * // Update many EventDateZones
     * const eventDateZone = await prisma.eventDateZone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventDateZones and only return the `eventDateZoneId`
     * const eventDateZoneWithEventDateZoneIdOnly = await prisma.eventDateZone.updateManyAndReturn({
     *   select: { eventDateZoneId: true },
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
    updateManyAndReturn<T extends EventDateZoneUpdateManyAndReturnArgs>(args: SelectSubset<T, EventDateZoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventDateZone.
     * @param {EventDateZoneUpsertArgs} args - Arguments to update or create a EventDateZone.
     * @example
     * // Update or create a EventDateZone
     * const eventDateZone = await prisma.eventDateZone.upsert({
     *   create: {
     *     // ... data to create a EventDateZone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventDateZone we want to update
     *   }
     * })
     */
    upsert<T extends EventDateZoneUpsertArgs>(args: SelectSubset<T, EventDateZoneUpsertArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventDateZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneCountArgs} args - Arguments to filter EventDateZones to count.
     * @example
     * // Count the number of EventDateZones
     * const count = await prisma.eventDateZone.count({
     *   where: {
     *     // ... the filter for the EventDateZones we want to count
     *   }
     * })
    **/
    count<T extends EventDateZoneCountArgs>(
      args?: Subset<T, EventDateZoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventDateZoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventDateZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventDateZoneAggregateArgs>(args: Subset<T, EventDateZoneAggregateArgs>): Prisma.PrismaPromise<GetEventDateZoneAggregateType<T>>

    /**
     * Group by EventDateZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneGroupByArgs} args - Group by arguments.
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
      T extends EventDateZoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventDateZoneGroupByArgs['orderBy'] }
        : { orderBy?: EventDateZoneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventDateZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventDateZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventDateZone model
   */
  readonly fields: EventDateZoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventDateZone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventDateZoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eventDate<T extends EventDateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDateDefaultArgs<ExtArgs>>): Prisma__EventDateClient<$Result.GetResult<Prisma.$EventDatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seatMap<T extends EventDateZone$seatMapArgs<ExtArgs> = {}>(args?: Subset<T, EventDateZone$seatMapArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    allocations<T extends EventDateZone$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, EventDateZone$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the EventDateZone model
   */
  interface EventDateZoneFieldRefs {
    readonly eventDateZoneId: FieldRef<"EventDateZone", 'BigInt'>
    readonly eventDateId: FieldRef<"EventDateZone", 'BigInt'>
    readonly name: FieldRef<"EventDateZone", 'String'>
    readonly kind: FieldRef<"EventDateZone", 'ZONE_KIND'>
    readonly basePrice: FieldRef<"EventDateZone", 'Decimal'>
    readonly capacity: FieldRef<"EventDateZone", 'Int'>
    readonly capacityRemaining: FieldRef<"EventDateZone", 'Int'>
    readonly seatMapId: FieldRef<"EventDateZone", 'BigInt'>
    readonly currency: FieldRef<"EventDateZone", 'CURRENCY'>
    readonly createdAt: FieldRef<"EventDateZone", 'DateTime'>
    readonly updatedAt: FieldRef<"EventDateZone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventDateZone findUnique
   */
  export type EventDateZoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZone to fetch.
     */
    where: EventDateZoneWhereUniqueInput
  }

  /**
   * EventDateZone findUniqueOrThrow
   */
  export type EventDateZoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZone to fetch.
     */
    where: EventDateZoneWhereUniqueInput
  }

  /**
   * EventDateZone findFirst
   */
  export type EventDateZoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZone to fetch.
     */
    where?: EventDateZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZones to fetch.
     */
    orderBy?: EventDateZoneOrderByWithRelationInput | EventDateZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDateZones.
     */
    cursor?: EventDateZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDateZones.
     */
    distinct?: EventDateZoneScalarFieldEnum | EventDateZoneScalarFieldEnum[]
  }

  /**
   * EventDateZone findFirstOrThrow
   */
  export type EventDateZoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZone to fetch.
     */
    where?: EventDateZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZones to fetch.
     */
    orderBy?: EventDateZoneOrderByWithRelationInput | EventDateZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDateZones.
     */
    cursor?: EventDateZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDateZones.
     */
    distinct?: EventDateZoneScalarFieldEnum | EventDateZoneScalarFieldEnum[]
  }

  /**
   * EventDateZone findMany
   */
  export type EventDateZoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZones to fetch.
     */
    where?: EventDateZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZones to fetch.
     */
    orderBy?: EventDateZoneOrderByWithRelationInput | EventDateZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventDateZones.
     */
    cursor?: EventDateZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZones.
     */
    skip?: number
    distinct?: EventDateZoneScalarFieldEnum | EventDateZoneScalarFieldEnum[]
  }

  /**
   * EventDateZone create
   */
  export type EventDateZoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * The data needed to create a EventDateZone.
     */
    data: XOR<EventDateZoneCreateInput, EventDateZoneUncheckedCreateInput>
  }

  /**
   * EventDateZone createMany
   */
  export type EventDateZoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventDateZones.
     */
    data: EventDateZoneCreateManyInput | EventDateZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventDateZone createManyAndReturn
   */
  export type EventDateZoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * The data used to create many EventDateZones.
     */
    data: EventDateZoneCreateManyInput | EventDateZoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDateZone update
   */
  export type EventDateZoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * The data needed to update a EventDateZone.
     */
    data: XOR<EventDateZoneUpdateInput, EventDateZoneUncheckedUpdateInput>
    /**
     * Choose, which EventDateZone to update.
     */
    where: EventDateZoneWhereUniqueInput
  }

  /**
   * EventDateZone updateMany
   */
  export type EventDateZoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventDateZones.
     */
    data: XOR<EventDateZoneUpdateManyMutationInput, EventDateZoneUncheckedUpdateManyInput>
    /**
     * Filter which EventDateZones to update
     */
    where?: EventDateZoneWhereInput
    /**
     * Limit how many EventDateZones to update.
     */
    limit?: number
  }

  /**
   * EventDateZone updateManyAndReturn
   */
  export type EventDateZoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * The data used to update EventDateZones.
     */
    data: XOR<EventDateZoneUpdateManyMutationInput, EventDateZoneUncheckedUpdateManyInput>
    /**
     * Filter which EventDateZones to update
     */
    where?: EventDateZoneWhereInput
    /**
     * Limit how many EventDateZones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDateZone upsert
   */
  export type EventDateZoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * The filter to search for the EventDateZone to update in case it exists.
     */
    where: EventDateZoneWhereUniqueInput
    /**
     * In case the EventDateZone found by the `where` argument doesn't exist, create a new EventDateZone with this data.
     */
    create: XOR<EventDateZoneCreateInput, EventDateZoneUncheckedCreateInput>
    /**
     * In case the EventDateZone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventDateZoneUpdateInput, EventDateZoneUncheckedUpdateInput>
  }

  /**
   * EventDateZone delete
   */
  export type EventDateZoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    /**
     * Filter which EventDateZone to delete.
     */
    where: EventDateZoneWhereUniqueInput
  }

  /**
   * EventDateZone deleteMany
   */
  export type EventDateZoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDateZones to delete
     */
    where?: EventDateZoneWhereInput
    /**
     * Limit how many EventDateZones to delete.
     */
    limit?: number
  }

  /**
   * EventDateZone.seatMap
   */
  export type EventDateZone$seatMapArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    where?: SeatMapWhereInput
  }

  /**
   * EventDateZone.allocations
   */
  export type EventDateZone$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    where?: EventDateZoneAllocationWhereInput
    orderBy?: EventDateZoneAllocationOrderByWithRelationInput | EventDateZoneAllocationOrderByWithRelationInput[]
    cursor?: EventDateZoneAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDateZoneAllocationScalarFieldEnum | EventDateZoneAllocationScalarFieldEnum[]
  }

  /**
   * EventDateZone without action
   */
  export type EventDateZoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
  }


  /**
   * Model SeatMap
   */

  export type AggregateSeatMap = {
    _count: SeatMapCountAggregateOutputType | null
    _avg: SeatMapAvgAggregateOutputType | null
    _sum: SeatMapSumAggregateOutputType | null
    _min: SeatMapMinAggregateOutputType | null
    _max: SeatMapMaxAggregateOutputType | null
  }

  export type SeatMapAvgAggregateOutputType = {
    seatMapId: number | null
    rows: number | null
    cols: number | null
  }

  export type SeatMapSumAggregateOutputType = {
    seatMapId: bigint | null
    rows: number | null
    cols: number | null
  }

  export type SeatMapMinAggregateOutputType = {
    seatMapId: bigint | null
    rows: number | null
    cols: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SeatMapMaxAggregateOutputType = {
    seatMapId: bigint | null
    rows: number | null
    cols: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SeatMapCountAggregateOutputType = {
    seatMapId: number
    rows: number
    cols: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SeatMapAvgAggregateInputType = {
    seatMapId?: true
    rows?: true
    cols?: true
  }

  export type SeatMapSumAggregateInputType = {
    seatMapId?: true
    rows?: true
    cols?: true
  }

  export type SeatMapMinAggregateInputType = {
    seatMapId?: true
    rows?: true
    cols?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SeatMapMaxAggregateInputType = {
    seatMapId?: true
    rows?: true
    cols?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SeatMapCountAggregateInputType = {
    seatMapId?: true
    rows?: true
    cols?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SeatMapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SeatMap to aggregate.
     */
    where?: SeatMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeatMaps to fetch.
     */
    orderBy?: SeatMapOrderByWithRelationInput | SeatMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SeatMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeatMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeatMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SeatMaps
    **/
    _count?: true | SeatMapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SeatMapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SeatMapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SeatMapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SeatMapMaxAggregateInputType
  }

  export type GetSeatMapAggregateType<T extends SeatMapAggregateArgs> = {
        [P in keyof T & keyof AggregateSeatMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeatMap[P]>
      : GetScalarType<T[P], AggregateSeatMap[P]>
  }




  export type SeatMapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeatMapWhereInput
    orderBy?: SeatMapOrderByWithAggregationInput | SeatMapOrderByWithAggregationInput[]
    by: SeatMapScalarFieldEnum[] | SeatMapScalarFieldEnum
    having?: SeatMapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SeatMapCountAggregateInputType | true
    _avg?: SeatMapAvgAggregateInputType
    _sum?: SeatMapSumAggregateInputType
    _min?: SeatMapMinAggregateInputType
    _max?: SeatMapMaxAggregateInputType
  }

  export type SeatMapGroupByOutputType = {
    seatMapId: bigint
    rows: number
    cols: number
    createdAt: Date
    updatedAt: Date
    _count: SeatMapCountAggregateOutputType | null
    _avg: SeatMapAvgAggregateOutputType | null
    _sum: SeatMapSumAggregateOutputType | null
    _min: SeatMapMinAggregateOutputType | null
    _max: SeatMapMaxAggregateOutputType | null
  }

  type GetSeatMapGroupByPayload<T extends SeatMapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SeatMapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SeatMapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SeatMapGroupByOutputType[P]>
            : GetScalarType<T[P], SeatMapGroupByOutputType[P]>
        }
      >
    >


  export type SeatMapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatMapId?: boolean
    rows?: boolean
    cols?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    occupiedSeats?: boolean | SeatMap$occupiedSeatsArgs<ExtArgs>
    EventDateZone?: boolean | SeatMap$EventDateZoneArgs<ExtArgs>
    _count?: boolean | SeatMapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seatMap"]>

  export type SeatMapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatMapId?: boolean
    rows?: boolean
    cols?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seatMap"]>

  export type SeatMapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatMapId?: boolean
    rows?: boolean
    cols?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seatMap"]>

  export type SeatMapSelectScalar = {
    seatMapId?: boolean
    rows?: boolean
    cols?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SeatMapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"seatMapId" | "rows" | "cols" | "createdAt" | "updatedAt", ExtArgs["result"]["seatMap"]>
  export type SeatMapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    occupiedSeats?: boolean | SeatMap$occupiedSeatsArgs<ExtArgs>
    EventDateZone?: boolean | SeatMap$EventDateZoneArgs<ExtArgs>
    _count?: boolean | SeatMapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SeatMapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SeatMapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SeatMapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SeatMap"
    objects: {
      occupiedSeats: Prisma.$SeatPayload<ExtArgs>[]
      EventDateZone: Prisma.$EventDateZonePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      seatMapId: bigint
      rows: number
      cols: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["seatMap"]>
    composites: {}
  }

  type SeatMapGetPayload<S extends boolean | null | undefined | SeatMapDefaultArgs> = $Result.GetResult<Prisma.$SeatMapPayload, S>

  type SeatMapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SeatMapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SeatMapCountAggregateInputType | true
    }

  export interface SeatMapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SeatMap'], meta: { name: 'SeatMap' } }
    /**
     * Find zero or one SeatMap that matches the filter.
     * @param {SeatMapFindUniqueArgs} args - Arguments to find a SeatMap
     * @example
     * // Get one SeatMap
     * const seatMap = await prisma.seatMap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeatMapFindUniqueArgs>(args: SelectSubset<T, SeatMapFindUniqueArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SeatMap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeatMapFindUniqueOrThrowArgs} args - Arguments to find a SeatMap
     * @example
     * // Get one SeatMap
     * const seatMap = await prisma.seatMap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeatMapFindUniqueOrThrowArgs>(args: SelectSubset<T, SeatMapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SeatMap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapFindFirstArgs} args - Arguments to find a SeatMap
     * @example
     * // Get one SeatMap
     * const seatMap = await prisma.seatMap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeatMapFindFirstArgs>(args?: SelectSubset<T, SeatMapFindFirstArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SeatMap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapFindFirstOrThrowArgs} args - Arguments to find a SeatMap
     * @example
     * // Get one SeatMap
     * const seatMap = await prisma.seatMap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeatMapFindFirstOrThrowArgs>(args?: SelectSubset<T, SeatMapFindFirstOrThrowArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SeatMaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SeatMaps
     * const seatMaps = await prisma.seatMap.findMany()
     * 
     * // Get first 10 SeatMaps
     * const seatMaps = await prisma.seatMap.findMany({ take: 10 })
     * 
     * // Only select the `seatMapId`
     * const seatMapWithSeatMapIdOnly = await prisma.seatMap.findMany({ select: { seatMapId: true } })
     * 
     */
    findMany<T extends SeatMapFindManyArgs>(args?: SelectSubset<T, SeatMapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SeatMap.
     * @param {SeatMapCreateArgs} args - Arguments to create a SeatMap.
     * @example
     * // Create one SeatMap
     * const SeatMap = await prisma.seatMap.create({
     *   data: {
     *     // ... data to create a SeatMap
     *   }
     * })
     * 
     */
    create<T extends SeatMapCreateArgs>(args: SelectSubset<T, SeatMapCreateArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SeatMaps.
     * @param {SeatMapCreateManyArgs} args - Arguments to create many SeatMaps.
     * @example
     * // Create many SeatMaps
     * const seatMap = await prisma.seatMap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SeatMapCreateManyArgs>(args?: SelectSubset<T, SeatMapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SeatMaps and returns the data saved in the database.
     * @param {SeatMapCreateManyAndReturnArgs} args - Arguments to create many SeatMaps.
     * @example
     * // Create many SeatMaps
     * const seatMap = await prisma.seatMap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SeatMaps and only return the `seatMapId`
     * const seatMapWithSeatMapIdOnly = await prisma.seatMap.createManyAndReturn({
     *   select: { seatMapId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SeatMapCreateManyAndReturnArgs>(args?: SelectSubset<T, SeatMapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SeatMap.
     * @param {SeatMapDeleteArgs} args - Arguments to delete one SeatMap.
     * @example
     * // Delete one SeatMap
     * const SeatMap = await prisma.seatMap.delete({
     *   where: {
     *     // ... filter to delete one SeatMap
     *   }
     * })
     * 
     */
    delete<T extends SeatMapDeleteArgs>(args: SelectSubset<T, SeatMapDeleteArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SeatMap.
     * @param {SeatMapUpdateArgs} args - Arguments to update one SeatMap.
     * @example
     * // Update one SeatMap
     * const seatMap = await prisma.seatMap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SeatMapUpdateArgs>(args: SelectSubset<T, SeatMapUpdateArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SeatMaps.
     * @param {SeatMapDeleteManyArgs} args - Arguments to filter SeatMaps to delete.
     * @example
     * // Delete a few SeatMaps
     * const { count } = await prisma.seatMap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SeatMapDeleteManyArgs>(args?: SelectSubset<T, SeatMapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SeatMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SeatMaps
     * const seatMap = await prisma.seatMap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SeatMapUpdateManyArgs>(args: SelectSubset<T, SeatMapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SeatMaps and returns the data updated in the database.
     * @param {SeatMapUpdateManyAndReturnArgs} args - Arguments to update many SeatMaps.
     * @example
     * // Update many SeatMaps
     * const seatMap = await prisma.seatMap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SeatMaps and only return the `seatMapId`
     * const seatMapWithSeatMapIdOnly = await prisma.seatMap.updateManyAndReturn({
     *   select: { seatMapId: true },
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
    updateManyAndReturn<T extends SeatMapUpdateManyAndReturnArgs>(args: SelectSubset<T, SeatMapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SeatMap.
     * @param {SeatMapUpsertArgs} args - Arguments to update or create a SeatMap.
     * @example
     * // Update or create a SeatMap
     * const seatMap = await prisma.seatMap.upsert({
     *   create: {
     *     // ... data to create a SeatMap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SeatMap we want to update
     *   }
     * })
     */
    upsert<T extends SeatMapUpsertArgs>(args: SelectSubset<T, SeatMapUpsertArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SeatMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapCountArgs} args - Arguments to filter SeatMaps to count.
     * @example
     * // Count the number of SeatMaps
     * const count = await prisma.seatMap.count({
     *   where: {
     *     // ... the filter for the SeatMaps we want to count
     *   }
     * })
    **/
    count<T extends SeatMapCountArgs>(
      args?: Subset<T, SeatMapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SeatMapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SeatMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SeatMapAggregateArgs>(args: Subset<T, SeatMapAggregateArgs>): Prisma.PrismaPromise<GetSeatMapAggregateType<T>>

    /**
     * Group by SeatMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatMapGroupByArgs} args - Group by arguments.
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
      T extends SeatMapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SeatMapGroupByArgs['orderBy'] }
        : { orderBy?: SeatMapGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SeatMapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeatMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SeatMap model
   */
  readonly fields: SeatMapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SeatMap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SeatMapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    occupiedSeats<T extends SeatMap$occupiedSeatsArgs<ExtArgs> = {}>(args?: Subset<T, SeatMap$occupiedSeatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    EventDateZone<T extends SeatMap$EventDateZoneArgs<ExtArgs> = {}>(args?: Subset<T, SeatMap$EventDateZoneArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SeatMap model
   */
  interface SeatMapFieldRefs {
    readonly seatMapId: FieldRef<"SeatMap", 'BigInt'>
    readonly rows: FieldRef<"SeatMap", 'Int'>
    readonly cols: FieldRef<"SeatMap", 'Int'>
    readonly createdAt: FieldRef<"SeatMap", 'DateTime'>
    readonly updatedAt: FieldRef<"SeatMap", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SeatMap findUnique
   */
  export type SeatMapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * Filter, which SeatMap to fetch.
     */
    where: SeatMapWhereUniqueInput
  }

  /**
   * SeatMap findUniqueOrThrow
   */
  export type SeatMapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * Filter, which SeatMap to fetch.
     */
    where: SeatMapWhereUniqueInput
  }

  /**
   * SeatMap findFirst
   */
  export type SeatMapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * Filter, which SeatMap to fetch.
     */
    where?: SeatMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeatMaps to fetch.
     */
    orderBy?: SeatMapOrderByWithRelationInput | SeatMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SeatMaps.
     */
    cursor?: SeatMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeatMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeatMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SeatMaps.
     */
    distinct?: SeatMapScalarFieldEnum | SeatMapScalarFieldEnum[]
  }

  /**
   * SeatMap findFirstOrThrow
   */
  export type SeatMapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * Filter, which SeatMap to fetch.
     */
    where?: SeatMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeatMaps to fetch.
     */
    orderBy?: SeatMapOrderByWithRelationInput | SeatMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SeatMaps.
     */
    cursor?: SeatMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeatMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeatMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SeatMaps.
     */
    distinct?: SeatMapScalarFieldEnum | SeatMapScalarFieldEnum[]
  }

  /**
   * SeatMap findMany
   */
  export type SeatMapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * Filter, which SeatMaps to fetch.
     */
    where?: SeatMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeatMaps to fetch.
     */
    orderBy?: SeatMapOrderByWithRelationInput | SeatMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SeatMaps.
     */
    cursor?: SeatMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeatMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeatMaps.
     */
    skip?: number
    distinct?: SeatMapScalarFieldEnum | SeatMapScalarFieldEnum[]
  }

  /**
   * SeatMap create
   */
  export type SeatMapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * The data needed to create a SeatMap.
     */
    data: XOR<SeatMapCreateInput, SeatMapUncheckedCreateInput>
  }

  /**
   * SeatMap createMany
   */
  export type SeatMapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SeatMaps.
     */
    data: SeatMapCreateManyInput | SeatMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SeatMap createManyAndReturn
   */
  export type SeatMapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * The data used to create many SeatMaps.
     */
    data: SeatMapCreateManyInput | SeatMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SeatMap update
   */
  export type SeatMapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * The data needed to update a SeatMap.
     */
    data: XOR<SeatMapUpdateInput, SeatMapUncheckedUpdateInput>
    /**
     * Choose, which SeatMap to update.
     */
    where: SeatMapWhereUniqueInput
  }

  /**
   * SeatMap updateMany
   */
  export type SeatMapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SeatMaps.
     */
    data: XOR<SeatMapUpdateManyMutationInput, SeatMapUncheckedUpdateManyInput>
    /**
     * Filter which SeatMaps to update
     */
    where?: SeatMapWhereInput
    /**
     * Limit how many SeatMaps to update.
     */
    limit?: number
  }

  /**
   * SeatMap updateManyAndReturn
   */
  export type SeatMapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * The data used to update SeatMaps.
     */
    data: XOR<SeatMapUpdateManyMutationInput, SeatMapUncheckedUpdateManyInput>
    /**
     * Filter which SeatMaps to update
     */
    where?: SeatMapWhereInput
    /**
     * Limit how many SeatMaps to update.
     */
    limit?: number
  }

  /**
   * SeatMap upsert
   */
  export type SeatMapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * The filter to search for the SeatMap to update in case it exists.
     */
    where: SeatMapWhereUniqueInput
    /**
     * In case the SeatMap found by the `where` argument doesn't exist, create a new SeatMap with this data.
     */
    create: XOR<SeatMapCreateInput, SeatMapUncheckedCreateInput>
    /**
     * In case the SeatMap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SeatMapUpdateInput, SeatMapUncheckedUpdateInput>
  }

  /**
   * SeatMap delete
   */
  export type SeatMapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
    /**
     * Filter which SeatMap to delete.
     */
    where: SeatMapWhereUniqueInput
  }

  /**
   * SeatMap deleteMany
   */
  export type SeatMapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SeatMaps to delete
     */
    where?: SeatMapWhereInput
    /**
     * Limit how many SeatMaps to delete.
     */
    limit?: number
  }

  /**
   * SeatMap.occupiedSeats
   */
  export type SeatMap$occupiedSeatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    where?: SeatWhereInput
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    cursor?: SeatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * SeatMap.EventDateZone
   */
  export type SeatMap$EventDateZoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZone
     */
    select?: EventDateZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZone
     */
    omit?: EventDateZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneInclude<ExtArgs> | null
    where?: EventDateZoneWhereInput
  }

  /**
   * SeatMap without action
   */
  export type SeatMapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatMap
     */
    select?: SeatMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeatMap
     */
    omit?: SeatMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatMapInclude<ExtArgs> | null
  }


  /**
   * Model Seat
   */

  export type AggregateSeat = {
    _count: SeatCountAggregateOutputType | null
    _avg: SeatAvgAggregateOutputType | null
    _sum: SeatSumAggregateOutputType | null
    _min: SeatMinAggregateOutputType | null
    _max: SeatMaxAggregateOutputType | null
  }

  export type SeatAvgAggregateOutputType = {
    seatId: number | null
    seatMapId: number | null
    rowNumber: number | null
    colNumber: number | null
  }

  export type SeatSumAggregateOutputType = {
    seatId: bigint | null
    seatMapId: bigint | null
    rowNumber: number | null
    colNumber: number | null
  }

  export type SeatMinAggregateOutputType = {
    seatId: bigint | null
    seatMapId: bigint | null
    rowNumber: number | null
    colNumber: number | null
  }

  export type SeatMaxAggregateOutputType = {
    seatId: bigint | null
    seatMapId: bigint | null
    rowNumber: number | null
    colNumber: number | null
  }

  export type SeatCountAggregateOutputType = {
    seatId: number
    seatMapId: number
    rowNumber: number
    colNumber: number
    _all: number
  }


  export type SeatAvgAggregateInputType = {
    seatId?: true
    seatMapId?: true
    rowNumber?: true
    colNumber?: true
  }

  export type SeatSumAggregateInputType = {
    seatId?: true
    seatMapId?: true
    rowNumber?: true
    colNumber?: true
  }

  export type SeatMinAggregateInputType = {
    seatId?: true
    seatMapId?: true
    rowNumber?: true
    colNumber?: true
  }

  export type SeatMaxAggregateInputType = {
    seatId?: true
    seatMapId?: true
    rowNumber?: true
    colNumber?: true
  }

  export type SeatCountAggregateInputType = {
    seatId?: true
    seatMapId?: true
    rowNumber?: true
    colNumber?: true
    _all?: true
  }

  export type SeatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seat to aggregate.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Seats
    **/
    _count?: true | SeatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SeatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SeatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SeatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SeatMaxAggregateInputType
  }

  export type GetSeatAggregateType<T extends SeatAggregateArgs> = {
        [P in keyof T & keyof AggregateSeat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeat[P]>
      : GetScalarType<T[P], AggregateSeat[P]>
  }




  export type SeatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeatWhereInput
    orderBy?: SeatOrderByWithAggregationInput | SeatOrderByWithAggregationInput[]
    by: SeatScalarFieldEnum[] | SeatScalarFieldEnum
    having?: SeatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SeatCountAggregateInputType | true
    _avg?: SeatAvgAggregateInputType
    _sum?: SeatSumAggregateInputType
    _min?: SeatMinAggregateInputType
    _max?: SeatMaxAggregateInputType
  }

  export type SeatGroupByOutputType = {
    seatId: bigint
    seatMapId: bigint
    rowNumber: number
    colNumber: number
    _count: SeatCountAggregateOutputType | null
    _avg: SeatAvgAggregateOutputType | null
    _sum: SeatSumAggregateOutputType | null
    _min: SeatMinAggregateOutputType | null
    _max: SeatMaxAggregateOutputType | null
  }

  type GetSeatGroupByPayload<T extends SeatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SeatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SeatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SeatGroupByOutputType[P]>
            : GetScalarType<T[P], SeatGroupByOutputType[P]>
        }
      >
    >


  export type SeatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatId?: boolean
    seatMapId?: boolean
    rowNumber?: boolean
    colNumber?: boolean
    seatMap?: boolean | SeatMapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatId?: boolean
    seatMapId?: boolean
    rowNumber?: boolean
    colNumber?: boolean
    seatMap?: boolean | SeatMapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatId?: boolean
    seatMapId?: boolean
    rowNumber?: boolean
    colNumber?: boolean
    seatMap?: boolean | SeatMapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectScalar = {
    seatId?: boolean
    seatMapId?: boolean
    rowNumber?: boolean
    colNumber?: boolean
  }

  export type SeatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"seatId" | "seatMapId" | "rowNumber" | "colNumber", ExtArgs["result"]["seat"]>
  export type SeatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatMap?: boolean | SeatMapDefaultArgs<ExtArgs>
  }
  export type SeatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatMap?: boolean | SeatMapDefaultArgs<ExtArgs>
  }
  export type SeatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatMap?: boolean | SeatMapDefaultArgs<ExtArgs>
  }

  export type $SeatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Seat"
    objects: {
      seatMap: Prisma.$SeatMapPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      seatId: bigint
      seatMapId: bigint
      rowNumber: number
      colNumber: number
    }, ExtArgs["result"]["seat"]>
    composites: {}
  }

  type SeatGetPayload<S extends boolean | null | undefined | SeatDefaultArgs> = $Result.GetResult<Prisma.$SeatPayload, S>

  type SeatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SeatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SeatCountAggregateInputType | true
    }

  export interface SeatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Seat'], meta: { name: 'Seat' } }
    /**
     * Find zero or one Seat that matches the filter.
     * @param {SeatFindUniqueArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeatFindUniqueArgs>(args: SelectSubset<T, SeatFindUniqueArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Seat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeatFindUniqueOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeatFindUniqueOrThrowArgs>(args: SelectSubset<T, SeatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeatFindFirstArgs>(args?: SelectSubset<T, SeatFindFirstArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeatFindFirstOrThrowArgs>(args?: SelectSubset<T, SeatFindFirstOrThrowArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Seats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Seats
     * const seats = await prisma.seat.findMany()
     * 
     * // Get first 10 Seats
     * const seats = await prisma.seat.findMany({ take: 10 })
     * 
     * // Only select the `seatId`
     * const seatWithSeatIdOnly = await prisma.seat.findMany({ select: { seatId: true } })
     * 
     */
    findMany<T extends SeatFindManyArgs>(args?: SelectSubset<T, SeatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Seat.
     * @param {SeatCreateArgs} args - Arguments to create a Seat.
     * @example
     * // Create one Seat
     * const Seat = await prisma.seat.create({
     *   data: {
     *     // ... data to create a Seat
     *   }
     * })
     * 
     */
    create<T extends SeatCreateArgs>(args: SelectSubset<T, SeatCreateArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Seats.
     * @param {SeatCreateManyArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SeatCreateManyArgs>(args?: SelectSubset<T, SeatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Seats and returns the data saved in the database.
     * @param {SeatCreateManyAndReturnArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Seats and only return the `seatId`
     * const seatWithSeatIdOnly = await prisma.seat.createManyAndReturn({
     *   select: { seatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SeatCreateManyAndReturnArgs>(args?: SelectSubset<T, SeatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Seat.
     * @param {SeatDeleteArgs} args - Arguments to delete one Seat.
     * @example
     * // Delete one Seat
     * const Seat = await prisma.seat.delete({
     *   where: {
     *     // ... filter to delete one Seat
     *   }
     * })
     * 
     */
    delete<T extends SeatDeleteArgs>(args: SelectSubset<T, SeatDeleteArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Seat.
     * @param {SeatUpdateArgs} args - Arguments to update one Seat.
     * @example
     * // Update one Seat
     * const seat = await prisma.seat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SeatUpdateArgs>(args: SelectSubset<T, SeatUpdateArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Seats.
     * @param {SeatDeleteManyArgs} args - Arguments to filter Seats to delete.
     * @example
     * // Delete a few Seats
     * const { count } = await prisma.seat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SeatDeleteManyArgs>(args?: SelectSubset<T, SeatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SeatUpdateManyArgs>(args: SelectSubset<T, SeatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Seats and returns the data updated in the database.
     * @param {SeatUpdateManyAndReturnArgs} args - Arguments to update many Seats.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Seats and only return the `seatId`
     * const seatWithSeatIdOnly = await prisma.seat.updateManyAndReturn({
     *   select: { seatId: true },
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
    updateManyAndReturn<T extends SeatUpdateManyAndReturnArgs>(args: SelectSubset<T, SeatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Seat.
     * @param {SeatUpsertArgs} args - Arguments to update or create a Seat.
     * @example
     * // Update or create a Seat
     * const seat = await prisma.seat.upsert({
     *   create: {
     *     // ... data to create a Seat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seat we want to update
     *   }
     * })
     */
    upsert<T extends SeatUpsertArgs>(args: SelectSubset<T, SeatUpsertArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatCountArgs} args - Arguments to filter Seats to count.
     * @example
     * // Count the number of Seats
     * const count = await prisma.seat.count({
     *   where: {
     *     // ... the filter for the Seats we want to count
     *   }
     * })
    **/
    count<T extends SeatCountArgs>(
      args?: Subset<T, SeatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SeatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SeatAggregateArgs>(args: Subset<T, SeatAggregateArgs>): Prisma.PrismaPromise<GetSeatAggregateType<T>>

    /**
     * Group by Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatGroupByArgs} args - Group by arguments.
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
      T extends SeatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SeatGroupByArgs['orderBy'] }
        : { orderBy?: SeatGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SeatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Seat model
   */
  readonly fields: SeatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Seat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SeatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seatMap<T extends SeatMapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SeatMapDefaultArgs<ExtArgs>>): Prisma__SeatMapClient<$Result.GetResult<Prisma.$SeatMapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Seat model
   */
  interface SeatFieldRefs {
    readonly seatId: FieldRef<"Seat", 'BigInt'>
    readonly seatMapId: FieldRef<"Seat", 'BigInt'>
    readonly rowNumber: FieldRef<"Seat", 'Int'>
    readonly colNumber: FieldRef<"Seat", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Seat findUnique
   */
  export type SeatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat findUniqueOrThrow
   */
  export type SeatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat findFirst
   */
  export type SeatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Seats.
     */
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat findFirstOrThrow
   */
  export type SeatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Seats.
     */
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat findMany
   */
  export type SeatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seats to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat create
   */
  export type SeatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * The data needed to create a Seat.
     */
    data: XOR<SeatCreateInput, SeatUncheckedCreateInput>
  }

  /**
   * Seat createMany
   */
  export type SeatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Seats.
     */
    data: SeatCreateManyInput | SeatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Seat createManyAndReturn
   */
  export type SeatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data used to create many Seats.
     */
    data: SeatCreateManyInput | SeatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Seat update
   */
  export type SeatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * The data needed to update a Seat.
     */
    data: XOR<SeatUpdateInput, SeatUncheckedUpdateInput>
    /**
     * Choose, which Seat to update.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat updateMany
   */
  export type SeatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Seats.
     */
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyInput>
    /**
     * Filter which Seats to update
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to update.
     */
    limit?: number
  }

  /**
   * Seat updateManyAndReturn
   */
  export type SeatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data used to update Seats.
     */
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyInput>
    /**
     * Filter which Seats to update
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Seat upsert
   */
  export type SeatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * The filter to search for the Seat to update in case it exists.
     */
    where: SeatWhereUniqueInput
    /**
     * In case the Seat found by the `where` argument doesn't exist, create a new Seat with this data.
     */
    create: XOR<SeatCreateInput, SeatUncheckedCreateInput>
    /**
     * In case the Seat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SeatUpdateInput, SeatUncheckedUpdateInput>
  }

  /**
   * Seat delete
   */
  export type SeatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter which Seat to delete.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat deleteMany
   */
  export type SeatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seats to delete
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to delete.
     */
    limit?: number
  }

  /**
   * Seat without action
   */
  export type SeatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
  }


  /**
   * Model EventDateZoneAllocation
   */

  export type AggregateEventDateZoneAllocation = {
    _count: EventDateZoneAllocationCountAggregateOutputType | null
    _avg: EventDateZoneAllocationAvgAggregateOutputType | null
    _sum: EventDateZoneAllocationSumAggregateOutputType | null
    _min: EventDateZoneAllocationMinAggregateOutputType | null
    _max: EventDateZoneAllocationMaxAggregateOutputType | null
  }

  export type EventDateZoneAllocationAvgAggregateOutputType = {
    eventDateZoneAllocationId: number | null
    eventDateZoneId: number | null
    discountPercent: Decimal | null
    allocatedQuantity: number | null
    remainingQuantity: number | null
  }

  export type EventDateZoneAllocationSumAggregateOutputType = {
    eventDateZoneAllocationId: bigint | null
    eventDateZoneId: bigint | null
    discountPercent: Decimal | null
    allocatedQuantity: number | null
    remainingQuantity: number | null
  }

  export type EventDateZoneAllocationMinAggregateOutputType = {
    eventDateZoneAllocationId: bigint | null
    eventDateZoneId: bigint | null
    audienceName: string | null
    discountPercent: Decimal | null
    allocatedQuantity: number | null
    remainingQuantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDateZoneAllocationMaxAggregateOutputType = {
    eventDateZoneAllocationId: bigint | null
    eventDateZoneId: bigint | null
    audienceName: string | null
    discountPercent: Decimal | null
    allocatedQuantity: number | null
    remainingQuantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDateZoneAllocationCountAggregateOutputType = {
    eventDateZoneAllocationId: number
    eventDateZoneId: number
    audienceName: number
    discountPercent: number
    allocatedQuantity: number
    remainingQuantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventDateZoneAllocationAvgAggregateInputType = {
    eventDateZoneAllocationId?: true
    eventDateZoneId?: true
    discountPercent?: true
    allocatedQuantity?: true
    remainingQuantity?: true
  }

  export type EventDateZoneAllocationSumAggregateInputType = {
    eventDateZoneAllocationId?: true
    eventDateZoneId?: true
    discountPercent?: true
    allocatedQuantity?: true
    remainingQuantity?: true
  }

  export type EventDateZoneAllocationMinAggregateInputType = {
    eventDateZoneAllocationId?: true
    eventDateZoneId?: true
    audienceName?: true
    discountPercent?: true
    allocatedQuantity?: true
    remainingQuantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDateZoneAllocationMaxAggregateInputType = {
    eventDateZoneAllocationId?: true
    eventDateZoneId?: true
    audienceName?: true
    discountPercent?: true
    allocatedQuantity?: true
    remainingQuantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDateZoneAllocationCountAggregateInputType = {
    eventDateZoneAllocationId?: true
    eventDateZoneId?: true
    audienceName?: true
    discountPercent?: true
    allocatedQuantity?: true
    remainingQuantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventDateZoneAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDateZoneAllocation to aggregate.
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZoneAllocations to fetch.
     */
    orderBy?: EventDateZoneAllocationOrderByWithRelationInput | EventDateZoneAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventDateZoneAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZoneAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZoneAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventDateZoneAllocations
    **/
    _count?: true | EventDateZoneAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventDateZoneAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventDateZoneAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventDateZoneAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventDateZoneAllocationMaxAggregateInputType
  }

  export type GetEventDateZoneAllocationAggregateType<T extends EventDateZoneAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateEventDateZoneAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventDateZoneAllocation[P]>
      : GetScalarType<T[P], AggregateEventDateZoneAllocation[P]>
  }




  export type EventDateZoneAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDateZoneAllocationWhereInput
    orderBy?: EventDateZoneAllocationOrderByWithAggregationInput | EventDateZoneAllocationOrderByWithAggregationInput[]
    by: EventDateZoneAllocationScalarFieldEnum[] | EventDateZoneAllocationScalarFieldEnum
    having?: EventDateZoneAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventDateZoneAllocationCountAggregateInputType | true
    _avg?: EventDateZoneAllocationAvgAggregateInputType
    _sum?: EventDateZoneAllocationSumAggregateInputType
    _min?: EventDateZoneAllocationMinAggregateInputType
    _max?: EventDateZoneAllocationMaxAggregateInputType
  }

  export type EventDateZoneAllocationGroupByOutputType = {
    eventDateZoneAllocationId: bigint
    eventDateZoneId: bigint
    audienceName: string
    discountPercent: Decimal
    allocatedQuantity: number
    remainingQuantity: number | null
    createdAt: Date
    updatedAt: Date
    _count: EventDateZoneAllocationCountAggregateOutputType | null
    _avg: EventDateZoneAllocationAvgAggregateOutputType | null
    _sum: EventDateZoneAllocationSumAggregateOutputType | null
    _min: EventDateZoneAllocationMinAggregateOutputType | null
    _max: EventDateZoneAllocationMaxAggregateOutputType | null
  }

  type GetEventDateZoneAllocationGroupByPayload<T extends EventDateZoneAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventDateZoneAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventDateZoneAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventDateZoneAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], EventDateZoneAllocationGroupByOutputType[P]>
        }
      >
    >


  export type EventDateZoneAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateZoneAllocationId?: boolean
    eventDateZoneId?: boolean
    audienceName?: boolean
    discountPercent?: boolean
    allocatedQuantity?: boolean
    remainingQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    zone?: boolean | EventDateZoneDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDateZoneAllocation"]>

  export type EventDateZoneAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateZoneAllocationId?: boolean
    eventDateZoneId?: boolean
    audienceName?: boolean
    discountPercent?: boolean
    allocatedQuantity?: boolean
    remainingQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    zone?: boolean | EventDateZoneDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDateZoneAllocation"]>

  export type EventDateZoneAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventDateZoneAllocationId?: boolean
    eventDateZoneId?: boolean
    audienceName?: boolean
    discountPercent?: boolean
    allocatedQuantity?: boolean
    remainingQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    zone?: boolean | EventDateZoneDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDateZoneAllocation"]>

  export type EventDateZoneAllocationSelectScalar = {
    eventDateZoneAllocationId?: boolean
    eventDateZoneId?: boolean
    audienceName?: boolean
    discountPercent?: boolean
    allocatedQuantity?: boolean
    remainingQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventDateZoneAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventDateZoneAllocationId" | "eventDateZoneId" | "audienceName" | "discountPercent" | "allocatedQuantity" | "remainingQuantity" | "createdAt" | "updatedAt", ExtArgs["result"]["eventDateZoneAllocation"]>
  export type EventDateZoneAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    zone?: boolean | EventDateZoneDefaultArgs<ExtArgs>
  }
  export type EventDateZoneAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    zone?: boolean | EventDateZoneDefaultArgs<ExtArgs>
  }
  export type EventDateZoneAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    zone?: boolean | EventDateZoneDefaultArgs<ExtArgs>
  }

  export type $EventDateZoneAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventDateZoneAllocation"
    objects: {
      zone: Prisma.$EventDateZonePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      eventDateZoneAllocationId: bigint
      eventDateZoneId: bigint
      audienceName: string
      discountPercent: Prisma.Decimal
      allocatedQuantity: number
      remainingQuantity: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventDateZoneAllocation"]>
    composites: {}
  }

  type EventDateZoneAllocationGetPayload<S extends boolean | null | undefined | EventDateZoneAllocationDefaultArgs> = $Result.GetResult<Prisma.$EventDateZoneAllocationPayload, S>

  type EventDateZoneAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventDateZoneAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventDateZoneAllocationCountAggregateInputType | true
    }

  export interface EventDateZoneAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventDateZoneAllocation'], meta: { name: 'EventDateZoneAllocation' } }
    /**
     * Find zero or one EventDateZoneAllocation that matches the filter.
     * @param {EventDateZoneAllocationFindUniqueArgs} args - Arguments to find a EventDateZoneAllocation
     * @example
     * // Get one EventDateZoneAllocation
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventDateZoneAllocationFindUniqueArgs>(args: SelectSubset<T, EventDateZoneAllocationFindUniqueArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventDateZoneAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventDateZoneAllocationFindUniqueOrThrowArgs} args - Arguments to find a EventDateZoneAllocation
     * @example
     * // Get one EventDateZoneAllocation
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventDateZoneAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, EventDateZoneAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDateZoneAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationFindFirstArgs} args - Arguments to find a EventDateZoneAllocation
     * @example
     * // Get one EventDateZoneAllocation
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventDateZoneAllocationFindFirstArgs>(args?: SelectSubset<T, EventDateZoneAllocationFindFirstArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDateZoneAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationFindFirstOrThrowArgs} args - Arguments to find a EventDateZoneAllocation
     * @example
     * // Get one EventDateZoneAllocation
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventDateZoneAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, EventDateZoneAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventDateZoneAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventDateZoneAllocations
     * const eventDateZoneAllocations = await prisma.eventDateZoneAllocation.findMany()
     * 
     * // Get first 10 EventDateZoneAllocations
     * const eventDateZoneAllocations = await prisma.eventDateZoneAllocation.findMany({ take: 10 })
     * 
     * // Only select the `eventDateZoneAllocationId`
     * const eventDateZoneAllocationWithEventDateZoneAllocationIdOnly = await prisma.eventDateZoneAllocation.findMany({ select: { eventDateZoneAllocationId: true } })
     * 
     */
    findMany<T extends EventDateZoneAllocationFindManyArgs>(args?: SelectSubset<T, EventDateZoneAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventDateZoneAllocation.
     * @param {EventDateZoneAllocationCreateArgs} args - Arguments to create a EventDateZoneAllocation.
     * @example
     * // Create one EventDateZoneAllocation
     * const EventDateZoneAllocation = await prisma.eventDateZoneAllocation.create({
     *   data: {
     *     // ... data to create a EventDateZoneAllocation
     *   }
     * })
     * 
     */
    create<T extends EventDateZoneAllocationCreateArgs>(args: SelectSubset<T, EventDateZoneAllocationCreateArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventDateZoneAllocations.
     * @param {EventDateZoneAllocationCreateManyArgs} args - Arguments to create many EventDateZoneAllocations.
     * @example
     * // Create many EventDateZoneAllocations
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventDateZoneAllocationCreateManyArgs>(args?: SelectSubset<T, EventDateZoneAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventDateZoneAllocations and returns the data saved in the database.
     * @param {EventDateZoneAllocationCreateManyAndReturnArgs} args - Arguments to create many EventDateZoneAllocations.
     * @example
     * // Create many EventDateZoneAllocations
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventDateZoneAllocations and only return the `eventDateZoneAllocationId`
     * const eventDateZoneAllocationWithEventDateZoneAllocationIdOnly = await prisma.eventDateZoneAllocation.createManyAndReturn({
     *   select: { eventDateZoneAllocationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventDateZoneAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, EventDateZoneAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventDateZoneAllocation.
     * @param {EventDateZoneAllocationDeleteArgs} args - Arguments to delete one EventDateZoneAllocation.
     * @example
     * // Delete one EventDateZoneAllocation
     * const EventDateZoneAllocation = await prisma.eventDateZoneAllocation.delete({
     *   where: {
     *     // ... filter to delete one EventDateZoneAllocation
     *   }
     * })
     * 
     */
    delete<T extends EventDateZoneAllocationDeleteArgs>(args: SelectSubset<T, EventDateZoneAllocationDeleteArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventDateZoneAllocation.
     * @param {EventDateZoneAllocationUpdateArgs} args - Arguments to update one EventDateZoneAllocation.
     * @example
     * // Update one EventDateZoneAllocation
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventDateZoneAllocationUpdateArgs>(args: SelectSubset<T, EventDateZoneAllocationUpdateArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventDateZoneAllocations.
     * @param {EventDateZoneAllocationDeleteManyArgs} args - Arguments to filter EventDateZoneAllocations to delete.
     * @example
     * // Delete a few EventDateZoneAllocations
     * const { count } = await prisma.eventDateZoneAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDateZoneAllocationDeleteManyArgs>(args?: SelectSubset<T, EventDateZoneAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDateZoneAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventDateZoneAllocations
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventDateZoneAllocationUpdateManyArgs>(args: SelectSubset<T, EventDateZoneAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDateZoneAllocations and returns the data updated in the database.
     * @param {EventDateZoneAllocationUpdateManyAndReturnArgs} args - Arguments to update many EventDateZoneAllocations.
     * @example
     * // Update many EventDateZoneAllocations
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventDateZoneAllocations and only return the `eventDateZoneAllocationId`
     * const eventDateZoneAllocationWithEventDateZoneAllocationIdOnly = await prisma.eventDateZoneAllocation.updateManyAndReturn({
     *   select: { eventDateZoneAllocationId: true },
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
    updateManyAndReturn<T extends EventDateZoneAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, EventDateZoneAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventDateZoneAllocation.
     * @param {EventDateZoneAllocationUpsertArgs} args - Arguments to update or create a EventDateZoneAllocation.
     * @example
     * // Update or create a EventDateZoneAllocation
     * const eventDateZoneAllocation = await prisma.eventDateZoneAllocation.upsert({
     *   create: {
     *     // ... data to create a EventDateZoneAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventDateZoneAllocation we want to update
     *   }
     * })
     */
    upsert<T extends EventDateZoneAllocationUpsertArgs>(args: SelectSubset<T, EventDateZoneAllocationUpsertArgs<ExtArgs>>): Prisma__EventDateZoneAllocationClient<$Result.GetResult<Prisma.$EventDateZoneAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventDateZoneAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationCountArgs} args - Arguments to filter EventDateZoneAllocations to count.
     * @example
     * // Count the number of EventDateZoneAllocations
     * const count = await prisma.eventDateZoneAllocation.count({
     *   where: {
     *     // ... the filter for the EventDateZoneAllocations we want to count
     *   }
     * })
    **/
    count<T extends EventDateZoneAllocationCountArgs>(
      args?: Subset<T, EventDateZoneAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventDateZoneAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventDateZoneAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventDateZoneAllocationAggregateArgs>(args: Subset<T, EventDateZoneAllocationAggregateArgs>): Prisma.PrismaPromise<GetEventDateZoneAllocationAggregateType<T>>

    /**
     * Group by EventDateZoneAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDateZoneAllocationGroupByArgs} args - Group by arguments.
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
      T extends EventDateZoneAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventDateZoneAllocationGroupByArgs['orderBy'] }
        : { orderBy?: EventDateZoneAllocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventDateZoneAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventDateZoneAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventDateZoneAllocation model
   */
  readonly fields: EventDateZoneAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventDateZoneAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventDateZoneAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    zone<T extends EventDateZoneDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDateZoneDefaultArgs<ExtArgs>>): Prisma__EventDateZoneClient<$Result.GetResult<Prisma.$EventDateZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EventDateZoneAllocation model
   */
  interface EventDateZoneAllocationFieldRefs {
    readonly eventDateZoneAllocationId: FieldRef<"EventDateZoneAllocation", 'BigInt'>
    readonly eventDateZoneId: FieldRef<"EventDateZoneAllocation", 'BigInt'>
    readonly audienceName: FieldRef<"EventDateZoneAllocation", 'String'>
    readonly discountPercent: FieldRef<"EventDateZoneAllocation", 'Decimal'>
    readonly allocatedQuantity: FieldRef<"EventDateZoneAllocation", 'Int'>
    readonly remainingQuantity: FieldRef<"EventDateZoneAllocation", 'Int'>
    readonly createdAt: FieldRef<"EventDateZoneAllocation", 'DateTime'>
    readonly updatedAt: FieldRef<"EventDateZoneAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventDateZoneAllocation findUnique
   */
  export type EventDateZoneAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZoneAllocation to fetch.
     */
    where: EventDateZoneAllocationWhereUniqueInput
  }

  /**
   * EventDateZoneAllocation findUniqueOrThrow
   */
  export type EventDateZoneAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZoneAllocation to fetch.
     */
    where: EventDateZoneAllocationWhereUniqueInput
  }

  /**
   * EventDateZoneAllocation findFirst
   */
  export type EventDateZoneAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZoneAllocation to fetch.
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZoneAllocations to fetch.
     */
    orderBy?: EventDateZoneAllocationOrderByWithRelationInput | EventDateZoneAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDateZoneAllocations.
     */
    cursor?: EventDateZoneAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZoneAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZoneAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDateZoneAllocations.
     */
    distinct?: EventDateZoneAllocationScalarFieldEnum | EventDateZoneAllocationScalarFieldEnum[]
  }

  /**
   * EventDateZoneAllocation findFirstOrThrow
   */
  export type EventDateZoneAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZoneAllocation to fetch.
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZoneAllocations to fetch.
     */
    orderBy?: EventDateZoneAllocationOrderByWithRelationInput | EventDateZoneAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDateZoneAllocations.
     */
    cursor?: EventDateZoneAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZoneAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZoneAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDateZoneAllocations.
     */
    distinct?: EventDateZoneAllocationScalarFieldEnum | EventDateZoneAllocationScalarFieldEnum[]
  }

  /**
   * EventDateZoneAllocation findMany
   */
  export type EventDateZoneAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * Filter, which EventDateZoneAllocations to fetch.
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDateZoneAllocations to fetch.
     */
    orderBy?: EventDateZoneAllocationOrderByWithRelationInput | EventDateZoneAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventDateZoneAllocations.
     */
    cursor?: EventDateZoneAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDateZoneAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDateZoneAllocations.
     */
    skip?: number
    distinct?: EventDateZoneAllocationScalarFieldEnum | EventDateZoneAllocationScalarFieldEnum[]
  }

  /**
   * EventDateZoneAllocation create
   */
  export type EventDateZoneAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a EventDateZoneAllocation.
     */
    data: XOR<EventDateZoneAllocationCreateInput, EventDateZoneAllocationUncheckedCreateInput>
  }

  /**
   * EventDateZoneAllocation createMany
   */
  export type EventDateZoneAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventDateZoneAllocations.
     */
    data: EventDateZoneAllocationCreateManyInput | EventDateZoneAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventDateZoneAllocation createManyAndReturn
   */
  export type EventDateZoneAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many EventDateZoneAllocations.
     */
    data: EventDateZoneAllocationCreateManyInput | EventDateZoneAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDateZoneAllocation update
   */
  export type EventDateZoneAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a EventDateZoneAllocation.
     */
    data: XOR<EventDateZoneAllocationUpdateInput, EventDateZoneAllocationUncheckedUpdateInput>
    /**
     * Choose, which EventDateZoneAllocation to update.
     */
    where: EventDateZoneAllocationWhereUniqueInput
  }

  /**
   * EventDateZoneAllocation updateMany
   */
  export type EventDateZoneAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventDateZoneAllocations.
     */
    data: XOR<EventDateZoneAllocationUpdateManyMutationInput, EventDateZoneAllocationUncheckedUpdateManyInput>
    /**
     * Filter which EventDateZoneAllocations to update
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * Limit how many EventDateZoneAllocations to update.
     */
    limit?: number
  }

  /**
   * EventDateZoneAllocation updateManyAndReturn
   */
  export type EventDateZoneAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * The data used to update EventDateZoneAllocations.
     */
    data: XOR<EventDateZoneAllocationUpdateManyMutationInput, EventDateZoneAllocationUncheckedUpdateManyInput>
    /**
     * Filter which EventDateZoneAllocations to update
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * Limit how many EventDateZoneAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDateZoneAllocation upsert
   */
  export type EventDateZoneAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the EventDateZoneAllocation to update in case it exists.
     */
    where: EventDateZoneAllocationWhereUniqueInput
    /**
     * In case the EventDateZoneAllocation found by the `where` argument doesn't exist, create a new EventDateZoneAllocation with this data.
     */
    create: XOR<EventDateZoneAllocationCreateInput, EventDateZoneAllocationUncheckedCreateInput>
    /**
     * In case the EventDateZoneAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventDateZoneAllocationUpdateInput, EventDateZoneAllocationUncheckedUpdateInput>
  }

  /**
   * EventDateZoneAllocation delete
   */
  export type EventDateZoneAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
    /**
     * Filter which EventDateZoneAllocation to delete.
     */
    where: EventDateZoneAllocationWhereUniqueInput
  }

  /**
   * EventDateZoneAllocation deleteMany
   */
  export type EventDateZoneAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDateZoneAllocations to delete
     */
    where?: EventDateZoneAllocationWhereInput
    /**
     * Limit how many EventDateZoneAllocations to delete.
     */
    limit?: number
  }

  /**
   * EventDateZoneAllocation without action
   */
  export type EventDateZoneAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDateZoneAllocation
     */
    select?: EventDateZoneAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDateZoneAllocation
     */
    omit?: EventDateZoneAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDateZoneAllocationInclude<ExtArgs> | null
  }


  /**
   * Model EventSalesPhase
   */

  export type AggregateEventSalesPhase = {
    _count: EventSalesPhaseCountAggregateOutputType | null
    _avg: EventSalesPhaseAvgAggregateOutputType | null
    _sum: EventSalesPhaseSumAggregateOutputType | null
    _min: EventSalesPhaseMinAggregateOutputType | null
    _max: EventSalesPhaseMaxAggregateOutputType | null
  }

  export type EventSalesPhaseAvgAggregateOutputType = {
    eventSalesPhaseId: number | null
    eventId: number | null
    percentage: Decimal | null
  }

  export type EventSalesPhaseSumAggregateOutputType = {
    eventSalesPhaseId: bigint | null
    eventId: bigint | null
    percentage: Decimal | null
  }

  export type EventSalesPhaseMinAggregateOutputType = {
    eventSalesPhaseId: bigint | null
    eventId: bigint | null
    name: string | null
    startAt: Date | null
    endAt: Date | null
    percentage: Decimal | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventSalesPhaseMaxAggregateOutputType = {
    eventSalesPhaseId: bigint | null
    eventId: bigint | null
    name: string | null
    startAt: Date | null
    endAt: Date | null
    percentage: Decimal | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventSalesPhaseCountAggregateOutputType = {
    eventSalesPhaseId: number
    eventId: number
    name: number
    startAt: number
    endAt: number
    percentage: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventSalesPhaseAvgAggregateInputType = {
    eventSalesPhaseId?: true
    eventId?: true
    percentage?: true
  }

  export type EventSalesPhaseSumAggregateInputType = {
    eventSalesPhaseId?: true
    eventId?: true
    percentage?: true
  }

  export type EventSalesPhaseMinAggregateInputType = {
    eventSalesPhaseId?: true
    eventId?: true
    name?: true
    startAt?: true
    endAt?: true
    percentage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventSalesPhaseMaxAggregateInputType = {
    eventSalesPhaseId?: true
    eventId?: true
    name?: true
    startAt?: true
    endAt?: true
    percentage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventSalesPhaseCountAggregateInputType = {
    eventSalesPhaseId?: true
    eventId?: true
    name?: true
    startAt?: true
    endAt?: true
    percentage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventSalesPhaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventSalesPhase to aggregate.
     */
    where?: EventSalesPhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSalesPhases to fetch.
     */
    orderBy?: EventSalesPhaseOrderByWithRelationInput | EventSalesPhaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventSalesPhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSalesPhases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSalesPhases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventSalesPhases
    **/
    _count?: true | EventSalesPhaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventSalesPhaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSalesPhaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventSalesPhaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventSalesPhaseMaxAggregateInputType
  }

  export type GetEventSalesPhaseAggregateType<T extends EventSalesPhaseAggregateArgs> = {
        [P in keyof T & keyof AggregateEventSalesPhase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventSalesPhase[P]>
      : GetScalarType<T[P], AggregateEventSalesPhase[P]>
  }




  export type EventSalesPhaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventSalesPhaseWhereInput
    orderBy?: EventSalesPhaseOrderByWithAggregationInput | EventSalesPhaseOrderByWithAggregationInput[]
    by: EventSalesPhaseScalarFieldEnum[] | EventSalesPhaseScalarFieldEnum
    having?: EventSalesPhaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventSalesPhaseCountAggregateInputType | true
    _avg?: EventSalesPhaseAvgAggregateInputType
    _sum?: EventSalesPhaseSumAggregateInputType
    _min?: EventSalesPhaseMinAggregateInputType
    _max?: EventSalesPhaseMaxAggregateInputType
  }

  export type EventSalesPhaseGroupByOutputType = {
    eventSalesPhaseId: bigint
    eventId: bigint
    name: string
    startAt: Date | null
    endAt: Date | null
    percentage: Decimal
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: EventSalesPhaseCountAggregateOutputType | null
    _avg: EventSalesPhaseAvgAggregateOutputType | null
    _sum: EventSalesPhaseSumAggregateOutputType | null
    _min: EventSalesPhaseMinAggregateOutputType | null
    _max: EventSalesPhaseMaxAggregateOutputType | null
  }

  type GetEventSalesPhaseGroupByPayload<T extends EventSalesPhaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventSalesPhaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventSalesPhaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventSalesPhaseGroupByOutputType[P]>
            : GetScalarType<T[P], EventSalesPhaseGroupByOutputType[P]>
        }
      >
    >


  export type EventSalesPhaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventSalesPhaseId?: boolean
    eventId?: boolean
    name?: boolean
    startAt?: boolean
    endAt?: boolean
    percentage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventSalesPhase"]>

  export type EventSalesPhaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventSalesPhaseId?: boolean
    eventId?: boolean
    name?: boolean
    startAt?: boolean
    endAt?: boolean
    percentage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventSalesPhase"]>

  export type EventSalesPhaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventSalesPhaseId?: boolean
    eventId?: boolean
    name?: boolean
    startAt?: boolean
    endAt?: boolean
    percentage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventSalesPhase"]>

  export type EventSalesPhaseSelectScalar = {
    eventSalesPhaseId?: boolean
    eventId?: boolean
    name?: boolean
    startAt?: boolean
    endAt?: boolean
    percentage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventSalesPhaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventSalesPhaseId" | "eventId" | "name" | "startAt" | "endAt" | "percentage" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["eventSalesPhase"]>
  export type EventSalesPhaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventSalesPhaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventSalesPhaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $EventSalesPhasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventSalesPhase"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      eventSalesPhaseId: bigint
      eventId: bigint
      name: string
      startAt: Date | null
      endAt: Date | null
      percentage: Prisma.Decimal
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventSalesPhase"]>
    composites: {}
  }

  type EventSalesPhaseGetPayload<S extends boolean | null | undefined | EventSalesPhaseDefaultArgs> = $Result.GetResult<Prisma.$EventSalesPhasePayload, S>

  type EventSalesPhaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventSalesPhaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventSalesPhaseCountAggregateInputType | true
    }

  export interface EventSalesPhaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventSalesPhase'], meta: { name: 'EventSalesPhase' } }
    /**
     * Find zero or one EventSalesPhase that matches the filter.
     * @param {EventSalesPhaseFindUniqueArgs} args - Arguments to find a EventSalesPhase
     * @example
     * // Get one EventSalesPhase
     * const eventSalesPhase = await prisma.eventSalesPhase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventSalesPhaseFindUniqueArgs>(args: SelectSubset<T, EventSalesPhaseFindUniqueArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventSalesPhase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventSalesPhaseFindUniqueOrThrowArgs} args - Arguments to find a EventSalesPhase
     * @example
     * // Get one EventSalesPhase
     * const eventSalesPhase = await prisma.eventSalesPhase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventSalesPhaseFindUniqueOrThrowArgs>(args: SelectSubset<T, EventSalesPhaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventSalesPhase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseFindFirstArgs} args - Arguments to find a EventSalesPhase
     * @example
     * // Get one EventSalesPhase
     * const eventSalesPhase = await prisma.eventSalesPhase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventSalesPhaseFindFirstArgs>(args?: SelectSubset<T, EventSalesPhaseFindFirstArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventSalesPhase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseFindFirstOrThrowArgs} args - Arguments to find a EventSalesPhase
     * @example
     * // Get one EventSalesPhase
     * const eventSalesPhase = await prisma.eventSalesPhase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventSalesPhaseFindFirstOrThrowArgs>(args?: SelectSubset<T, EventSalesPhaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventSalesPhases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventSalesPhases
     * const eventSalesPhases = await prisma.eventSalesPhase.findMany()
     * 
     * // Get first 10 EventSalesPhases
     * const eventSalesPhases = await prisma.eventSalesPhase.findMany({ take: 10 })
     * 
     * // Only select the `eventSalesPhaseId`
     * const eventSalesPhaseWithEventSalesPhaseIdOnly = await prisma.eventSalesPhase.findMany({ select: { eventSalesPhaseId: true } })
     * 
     */
    findMany<T extends EventSalesPhaseFindManyArgs>(args?: SelectSubset<T, EventSalesPhaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventSalesPhase.
     * @param {EventSalesPhaseCreateArgs} args - Arguments to create a EventSalesPhase.
     * @example
     * // Create one EventSalesPhase
     * const EventSalesPhase = await prisma.eventSalesPhase.create({
     *   data: {
     *     // ... data to create a EventSalesPhase
     *   }
     * })
     * 
     */
    create<T extends EventSalesPhaseCreateArgs>(args: SelectSubset<T, EventSalesPhaseCreateArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventSalesPhases.
     * @param {EventSalesPhaseCreateManyArgs} args - Arguments to create many EventSalesPhases.
     * @example
     * // Create many EventSalesPhases
     * const eventSalesPhase = await prisma.eventSalesPhase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventSalesPhaseCreateManyArgs>(args?: SelectSubset<T, EventSalesPhaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventSalesPhases and returns the data saved in the database.
     * @param {EventSalesPhaseCreateManyAndReturnArgs} args - Arguments to create many EventSalesPhases.
     * @example
     * // Create many EventSalesPhases
     * const eventSalesPhase = await prisma.eventSalesPhase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventSalesPhases and only return the `eventSalesPhaseId`
     * const eventSalesPhaseWithEventSalesPhaseIdOnly = await prisma.eventSalesPhase.createManyAndReturn({
     *   select: { eventSalesPhaseId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventSalesPhaseCreateManyAndReturnArgs>(args?: SelectSubset<T, EventSalesPhaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventSalesPhase.
     * @param {EventSalesPhaseDeleteArgs} args - Arguments to delete one EventSalesPhase.
     * @example
     * // Delete one EventSalesPhase
     * const EventSalesPhase = await prisma.eventSalesPhase.delete({
     *   where: {
     *     // ... filter to delete one EventSalesPhase
     *   }
     * })
     * 
     */
    delete<T extends EventSalesPhaseDeleteArgs>(args: SelectSubset<T, EventSalesPhaseDeleteArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventSalesPhase.
     * @param {EventSalesPhaseUpdateArgs} args - Arguments to update one EventSalesPhase.
     * @example
     * // Update one EventSalesPhase
     * const eventSalesPhase = await prisma.eventSalesPhase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventSalesPhaseUpdateArgs>(args: SelectSubset<T, EventSalesPhaseUpdateArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventSalesPhases.
     * @param {EventSalesPhaseDeleteManyArgs} args - Arguments to filter EventSalesPhases to delete.
     * @example
     * // Delete a few EventSalesPhases
     * const { count } = await prisma.eventSalesPhase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventSalesPhaseDeleteManyArgs>(args?: SelectSubset<T, EventSalesPhaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventSalesPhases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventSalesPhases
     * const eventSalesPhase = await prisma.eventSalesPhase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventSalesPhaseUpdateManyArgs>(args: SelectSubset<T, EventSalesPhaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventSalesPhases and returns the data updated in the database.
     * @param {EventSalesPhaseUpdateManyAndReturnArgs} args - Arguments to update many EventSalesPhases.
     * @example
     * // Update many EventSalesPhases
     * const eventSalesPhase = await prisma.eventSalesPhase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventSalesPhases and only return the `eventSalesPhaseId`
     * const eventSalesPhaseWithEventSalesPhaseIdOnly = await prisma.eventSalesPhase.updateManyAndReturn({
     *   select: { eventSalesPhaseId: true },
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
    updateManyAndReturn<T extends EventSalesPhaseUpdateManyAndReturnArgs>(args: SelectSubset<T, EventSalesPhaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventSalesPhase.
     * @param {EventSalesPhaseUpsertArgs} args - Arguments to update or create a EventSalesPhase.
     * @example
     * // Update or create a EventSalesPhase
     * const eventSalesPhase = await prisma.eventSalesPhase.upsert({
     *   create: {
     *     // ... data to create a EventSalesPhase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventSalesPhase we want to update
     *   }
     * })
     */
    upsert<T extends EventSalesPhaseUpsertArgs>(args: SelectSubset<T, EventSalesPhaseUpsertArgs<ExtArgs>>): Prisma__EventSalesPhaseClient<$Result.GetResult<Prisma.$EventSalesPhasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventSalesPhases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseCountArgs} args - Arguments to filter EventSalesPhases to count.
     * @example
     * // Count the number of EventSalesPhases
     * const count = await prisma.eventSalesPhase.count({
     *   where: {
     *     // ... the filter for the EventSalesPhases we want to count
     *   }
     * })
    **/
    count<T extends EventSalesPhaseCountArgs>(
      args?: Subset<T, EventSalesPhaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventSalesPhaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventSalesPhase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventSalesPhaseAggregateArgs>(args: Subset<T, EventSalesPhaseAggregateArgs>): Prisma.PrismaPromise<GetEventSalesPhaseAggregateType<T>>

    /**
     * Group by EventSalesPhase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSalesPhaseGroupByArgs} args - Group by arguments.
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
      T extends EventSalesPhaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventSalesPhaseGroupByArgs['orderBy'] }
        : { orderBy?: EventSalesPhaseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventSalesPhaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventSalesPhaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventSalesPhase model
   */
  readonly fields: EventSalesPhaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventSalesPhase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventSalesPhaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EventSalesPhase model
   */
  interface EventSalesPhaseFieldRefs {
    readonly eventSalesPhaseId: FieldRef<"EventSalesPhase", 'BigInt'>
    readonly eventId: FieldRef<"EventSalesPhase", 'BigInt'>
    readonly name: FieldRef<"EventSalesPhase", 'String'>
    readonly startAt: FieldRef<"EventSalesPhase", 'DateTime'>
    readonly endAt: FieldRef<"EventSalesPhase", 'DateTime'>
    readonly percentage: FieldRef<"EventSalesPhase", 'Decimal'>
    readonly active: FieldRef<"EventSalesPhase", 'Boolean'>
    readonly createdAt: FieldRef<"EventSalesPhase", 'DateTime'>
    readonly updatedAt: FieldRef<"EventSalesPhase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventSalesPhase findUnique
   */
  export type EventSalesPhaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * Filter, which EventSalesPhase to fetch.
     */
    where: EventSalesPhaseWhereUniqueInput
  }

  /**
   * EventSalesPhase findUniqueOrThrow
   */
  export type EventSalesPhaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * Filter, which EventSalesPhase to fetch.
     */
    where: EventSalesPhaseWhereUniqueInput
  }

  /**
   * EventSalesPhase findFirst
   */
  export type EventSalesPhaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * Filter, which EventSalesPhase to fetch.
     */
    where?: EventSalesPhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSalesPhases to fetch.
     */
    orderBy?: EventSalesPhaseOrderByWithRelationInput | EventSalesPhaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventSalesPhases.
     */
    cursor?: EventSalesPhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSalesPhases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSalesPhases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventSalesPhases.
     */
    distinct?: EventSalesPhaseScalarFieldEnum | EventSalesPhaseScalarFieldEnum[]
  }

  /**
   * EventSalesPhase findFirstOrThrow
   */
  export type EventSalesPhaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * Filter, which EventSalesPhase to fetch.
     */
    where?: EventSalesPhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSalesPhases to fetch.
     */
    orderBy?: EventSalesPhaseOrderByWithRelationInput | EventSalesPhaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventSalesPhases.
     */
    cursor?: EventSalesPhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSalesPhases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSalesPhases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventSalesPhases.
     */
    distinct?: EventSalesPhaseScalarFieldEnum | EventSalesPhaseScalarFieldEnum[]
  }

  /**
   * EventSalesPhase findMany
   */
  export type EventSalesPhaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * Filter, which EventSalesPhases to fetch.
     */
    where?: EventSalesPhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSalesPhases to fetch.
     */
    orderBy?: EventSalesPhaseOrderByWithRelationInput | EventSalesPhaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventSalesPhases.
     */
    cursor?: EventSalesPhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSalesPhases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSalesPhases.
     */
    skip?: number
    distinct?: EventSalesPhaseScalarFieldEnum | EventSalesPhaseScalarFieldEnum[]
  }

  /**
   * EventSalesPhase create
   */
  export type EventSalesPhaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * The data needed to create a EventSalesPhase.
     */
    data: XOR<EventSalesPhaseCreateInput, EventSalesPhaseUncheckedCreateInput>
  }

  /**
   * EventSalesPhase createMany
   */
  export type EventSalesPhaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventSalesPhases.
     */
    data: EventSalesPhaseCreateManyInput | EventSalesPhaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventSalesPhase createManyAndReturn
   */
  export type EventSalesPhaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * The data used to create many EventSalesPhases.
     */
    data: EventSalesPhaseCreateManyInput | EventSalesPhaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventSalesPhase update
   */
  export type EventSalesPhaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * The data needed to update a EventSalesPhase.
     */
    data: XOR<EventSalesPhaseUpdateInput, EventSalesPhaseUncheckedUpdateInput>
    /**
     * Choose, which EventSalesPhase to update.
     */
    where: EventSalesPhaseWhereUniqueInput
  }

  /**
   * EventSalesPhase updateMany
   */
  export type EventSalesPhaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventSalesPhases.
     */
    data: XOR<EventSalesPhaseUpdateManyMutationInput, EventSalesPhaseUncheckedUpdateManyInput>
    /**
     * Filter which EventSalesPhases to update
     */
    where?: EventSalesPhaseWhereInput
    /**
     * Limit how many EventSalesPhases to update.
     */
    limit?: number
  }

  /**
   * EventSalesPhase updateManyAndReturn
   */
  export type EventSalesPhaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * The data used to update EventSalesPhases.
     */
    data: XOR<EventSalesPhaseUpdateManyMutationInput, EventSalesPhaseUncheckedUpdateManyInput>
    /**
     * Filter which EventSalesPhases to update
     */
    where?: EventSalesPhaseWhereInput
    /**
     * Limit how many EventSalesPhases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventSalesPhase upsert
   */
  export type EventSalesPhaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * The filter to search for the EventSalesPhase to update in case it exists.
     */
    where: EventSalesPhaseWhereUniqueInput
    /**
     * In case the EventSalesPhase found by the `where` argument doesn't exist, create a new EventSalesPhase with this data.
     */
    create: XOR<EventSalesPhaseCreateInput, EventSalesPhaseUncheckedCreateInput>
    /**
     * In case the EventSalesPhase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventSalesPhaseUpdateInput, EventSalesPhaseUncheckedUpdateInput>
  }

  /**
   * EventSalesPhase delete
   */
  export type EventSalesPhaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
    /**
     * Filter which EventSalesPhase to delete.
     */
    where: EventSalesPhaseWhereUniqueInput
  }

  /**
   * EventSalesPhase deleteMany
   */
  export type EventSalesPhaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventSalesPhases to delete
     */
    where?: EventSalesPhaseWhereInput
    /**
     * Limit how many EventSalesPhases to delete.
     */
    limit?: number
  }

  /**
   * EventSalesPhase without action
   */
  export type EventSalesPhaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSalesPhase
     */
    select?: EventSalesPhaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSalesPhase
     */
    omit?: EventSalesPhaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSalesPhaseInclude<ExtArgs> | null
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


  export const EventCategoryScalarFieldEnum: {
    eventCategoryId: 'eventCategoryId',
    initials: 'initials',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventCategoryScalarFieldEnum = (typeof EventCategoryScalarFieldEnum)[keyof typeof EventCategoryScalarFieldEnum]


  export const EventToCategoryScalarFieldEnum: {
    eventId: 'eventId',
    eventCategoryId: 'eventCategoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventToCategoryScalarFieldEnum = (typeof EventToCategoryScalarFieldEnum)[keyof typeof EventToCategoryScalarFieldEnum]


  export const VenueScalarFieldEnum: {
    venueId: 'venueId',
    eventId: 'eventId',
    city: 'city',
    address: 'address',
    addressUrl: 'addressUrl',
    reference: 'reference',
    capacity: 'capacity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VenueScalarFieldEnum = (typeof VenueScalarFieldEnum)[keyof typeof VenueScalarFieldEnum]


  export const FeeScalarFieldEnum: {
    feeId: 'feeId',
    percentage: 'percentage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeeScalarFieldEnum = (typeof FeeScalarFieldEnum)[keyof typeof FeeScalarFieldEnum]


  export const EventScalarFieldEnum: {
    eventId: 'eventId',
    organizerId: 'organizerId',
    feeId: 'feeId',
    title: 'title',
    status: 'status',
    inPerson: 'inPerson',
    description: 'description',
    accessPolicy: 'accessPolicy',
    accessPolicyDescription: 'accessPolicyDescription',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const EventDateScalarFieldEnum: {
    eventDateId: 'eventDateId',
    eventId: 'eventId',
    startAt: 'startAt',
    endAt: 'endAt'
  };

  export type EventDateScalarFieldEnum = (typeof EventDateScalarFieldEnum)[keyof typeof EventDateScalarFieldEnum]


  export const EventDateZoneScalarFieldEnum: {
    eventDateZoneId: 'eventDateZoneId',
    eventDateId: 'eventDateId',
    name: 'name',
    kind: 'kind',
    basePrice: 'basePrice',
    capacity: 'capacity',
    capacityRemaining: 'capacityRemaining',
    seatMapId: 'seatMapId',
    currency: 'currency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventDateZoneScalarFieldEnum = (typeof EventDateZoneScalarFieldEnum)[keyof typeof EventDateZoneScalarFieldEnum]


  export const SeatMapScalarFieldEnum: {
    seatMapId: 'seatMapId',
    rows: 'rows',
    cols: 'cols',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SeatMapScalarFieldEnum = (typeof SeatMapScalarFieldEnum)[keyof typeof SeatMapScalarFieldEnum]


  export const SeatScalarFieldEnum: {
    seatId: 'seatId',
    seatMapId: 'seatMapId',
    rowNumber: 'rowNumber',
    colNumber: 'colNumber'
  };

  export type SeatScalarFieldEnum = (typeof SeatScalarFieldEnum)[keyof typeof SeatScalarFieldEnum]


  export const EventDateZoneAllocationScalarFieldEnum: {
    eventDateZoneAllocationId: 'eventDateZoneAllocationId',
    eventDateZoneId: 'eventDateZoneId',
    audienceName: 'audienceName',
    discountPercent: 'discountPercent',
    allocatedQuantity: 'allocatedQuantity',
    remainingQuantity: 'remainingQuantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventDateZoneAllocationScalarFieldEnum = (typeof EventDateZoneAllocationScalarFieldEnum)[keyof typeof EventDateZoneAllocationScalarFieldEnum]


  export const EventSalesPhaseScalarFieldEnum: {
    eventSalesPhaseId: 'eventSalesPhaseId',
    eventId: 'eventId',
    name: 'name',
    startAt: 'startAt',
    endAt: 'endAt',
    percentage: 'percentage',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventSalesPhaseScalarFieldEnum = (typeof EventSalesPhaseScalarFieldEnum)[keyof typeof EventSalesPhaseScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'EVENT_STATUS'
   */
  export type EnumEVENT_STATUSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EVENT_STATUS'>
    


  /**
   * Reference to a field of type 'EVENT_STATUS[]'
   */
  export type ListEnumEVENT_STATUSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EVENT_STATUS[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ACCESS_POLICY'
   */
  export type EnumACCESS_POLICYFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ACCESS_POLICY'>
    


  /**
   * Reference to a field of type 'ACCESS_POLICY[]'
   */
  export type ListEnumACCESS_POLICYFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ACCESS_POLICY[]'>
    


  /**
   * Reference to a field of type 'ZONE_KIND'
   */
  export type EnumZONE_KINDFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ZONE_KIND'>
    


  /**
   * Reference to a field of type 'ZONE_KIND[]'
   */
  export type ListEnumZONE_KINDFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ZONE_KIND[]'>
    


  /**
   * Reference to a field of type 'CURRENCY'
   */
  export type EnumCURRENCYFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CURRENCY'>
    


  /**
   * Reference to a field of type 'CURRENCY[]'
   */
  export type ListEnumCURRENCYFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CURRENCY[]'>
    


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
    events?: EventListRelationFilter
  }

  export type OrganizerOrderByWithRelationInput = {
    organizerId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    idType?: SortOrder
    idNumber?: SortOrder
    user?: UserOrderByWithRelationInput
    events?: EventOrderByRelationAggregateInput
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
    events?: EventListRelationFilter
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

  export type EventCategoryWhereInput = {
    AND?: EventCategoryWhereInput | EventCategoryWhereInput[]
    OR?: EventCategoryWhereInput[]
    NOT?: EventCategoryWhereInput | EventCategoryWhereInput[]
    eventCategoryId?: BigIntFilter<"EventCategory"> | bigint | number
    initials?: StringFilter<"EventCategory"> | string
    description?: StringFilter<"EventCategory"> | string
    createdAt?: DateTimeFilter<"EventCategory"> | Date | string
    updatedAt?: DateTimeFilter<"EventCategory"> | Date | string
    events?: EventToCategoryListRelationFilter
  }

  export type EventCategoryOrderByWithRelationInput = {
    eventCategoryId?: SortOrder
    initials?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EventToCategoryOrderByRelationAggregateInput
  }

  export type EventCategoryWhereUniqueInput = Prisma.AtLeast<{
    eventCategoryId?: bigint | number
    initials?: string
    AND?: EventCategoryWhereInput | EventCategoryWhereInput[]
    OR?: EventCategoryWhereInput[]
    NOT?: EventCategoryWhereInput | EventCategoryWhereInput[]
    description?: StringFilter<"EventCategory"> | string
    createdAt?: DateTimeFilter<"EventCategory"> | Date | string
    updatedAt?: DateTimeFilter<"EventCategory"> | Date | string
    events?: EventToCategoryListRelationFilter
  }, "eventCategoryId" | "initials">

  export type EventCategoryOrderByWithAggregationInput = {
    eventCategoryId?: SortOrder
    initials?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCategoryCountOrderByAggregateInput
    _avg?: EventCategoryAvgOrderByAggregateInput
    _max?: EventCategoryMaxOrderByAggregateInput
    _min?: EventCategoryMinOrderByAggregateInput
    _sum?: EventCategorySumOrderByAggregateInput
  }

  export type EventCategoryScalarWhereWithAggregatesInput = {
    AND?: EventCategoryScalarWhereWithAggregatesInput | EventCategoryScalarWhereWithAggregatesInput[]
    OR?: EventCategoryScalarWhereWithAggregatesInput[]
    NOT?: EventCategoryScalarWhereWithAggregatesInput | EventCategoryScalarWhereWithAggregatesInput[]
    eventCategoryId?: BigIntWithAggregatesFilter<"EventCategory"> | bigint | number
    initials?: StringWithAggregatesFilter<"EventCategory"> | string
    description?: StringWithAggregatesFilter<"EventCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EventCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventCategory"> | Date | string
  }

  export type EventToCategoryWhereInput = {
    AND?: EventToCategoryWhereInput | EventToCategoryWhereInput[]
    OR?: EventToCategoryWhereInput[]
    NOT?: EventToCategoryWhereInput | EventToCategoryWhereInput[]
    eventId?: BigIntFilter<"EventToCategory"> | bigint | number
    eventCategoryId?: BigIntFilter<"EventToCategory"> | bigint | number
    createdAt?: DateTimeFilter<"EventToCategory"> | Date | string
    updatedAt?: DateTimeFilter<"EventToCategory"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    category?: XOR<EventCategoryScalarRelationFilter, EventCategoryWhereInput>
  }

  export type EventToCategoryOrderByWithRelationInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
    category?: EventCategoryOrderByWithRelationInput
  }

  export type EventToCategoryWhereUniqueInput = Prisma.AtLeast<{
    eventId_eventCategoryId?: EventToCategoryEventIdEventCategoryIdCompoundUniqueInput
    AND?: EventToCategoryWhereInput | EventToCategoryWhereInput[]
    OR?: EventToCategoryWhereInput[]
    NOT?: EventToCategoryWhereInput | EventToCategoryWhereInput[]
    eventId?: BigIntFilter<"EventToCategory"> | bigint | number
    eventCategoryId?: BigIntFilter<"EventToCategory"> | bigint | number
    createdAt?: DateTimeFilter<"EventToCategory"> | Date | string
    updatedAt?: DateTimeFilter<"EventToCategory"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    category?: XOR<EventCategoryScalarRelationFilter, EventCategoryWhereInput>
  }, "eventId_eventCategoryId">

  export type EventToCategoryOrderByWithAggregationInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventToCategoryCountOrderByAggregateInput
    _avg?: EventToCategoryAvgOrderByAggregateInput
    _max?: EventToCategoryMaxOrderByAggregateInput
    _min?: EventToCategoryMinOrderByAggregateInput
    _sum?: EventToCategorySumOrderByAggregateInput
  }

  export type EventToCategoryScalarWhereWithAggregatesInput = {
    AND?: EventToCategoryScalarWhereWithAggregatesInput | EventToCategoryScalarWhereWithAggregatesInput[]
    OR?: EventToCategoryScalarWhereWithAggregatesInput[]
    NOT?: EventToCategoryScalarWhereWithAggregatesInput | EventToCategoryScalarWhereWithAggregatesInput[]
    eventId?: BigIntWithAggregatesFilter<"EventToCategory"> | bigint | number
    eventCategoryId?: BigIntWithAggregatesFilter<"EventToCategory"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"EventToCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventToCategory"> | Date | string
  }

  export type VenueWhereInput = {
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    venueId?: BigIntFilter<"Venue"> | bigint | number
    eventId?: BigIntFilter<"Venue"> | bigint | number
    city?: StringNullableFilter<"Venue"> | string | null
    address?: StringNullableFilter<"Venue"> | string | null
    addressUrl?: StringNullableFilter<"Venue"> | string | null
    reference?: StringNullableFilter<"Venue"> | string | null
    capacity?: IntFilter<"Venue"> | number
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type VenueOrderByWithRelationInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    city?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    addressUrl?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type VenueWhereUniqueInput = Prisma.AtLeast<{
    venueId?: bigint | number
    eventId?: bigint | number
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    city?: StringNullableFilter<"Venue"> | string | null
    address?: StringNullableFilter<"Venue"> | string | null
    addressUrl?: StringNullableFilter<"Venue"> | string | null
    reference?: StringNullableFilter<"Venue"> | string | null
    capacity?: IntFilter<"Venue"> | number
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "venueId" | "eventId">

  export type VenueOrderByWithAggregationInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    city?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    addressUrl?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VenueCountOrderByAggregateInput
    _avg?: VenueAvgOrderByAggregateInput
    _max?: VenueMaxOrderByAggregateInput
    _min?: VenueMinOrderByAggregateInput
    _sum?: VenueSumOrderByAggregateInput
  }

  export type VenueScalarWhereWithAggregatesInput = {
    AND?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    OR?: VenueScalarWhereWithAggregatesInput[]
    NOT?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    venueId?: BigIntWithAggregatesFilter<"Venue"> | bigint | number
    eventId?: BigIntWithAggregatesFilter<"Venue"> | bigint | number
    city?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    address?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    addressUrl?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    reference?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    capacity?: IntWithAggregatesFilter<"Venue"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
  }

  export type FeeWhereInput = {
    AND?: FeeWhereInput | FeeWhereInput[]
    OR?: FeeWhereInput[]
    NOT?: FeeWhereInput | FeeWhereInput[]
    feeId?: BigIntFilter<"Fee"> | bigint | number
    percentage?: DecimalFilter<"Fee"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Fee"> | Date | string
    updatedAt?: DateTimeFilter<"Fee"> | Date | string
    event?: EventListRelationFilter
  }

  export type FeeOrderByWithRelationInput = {
    feeId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByRelationAggregateInput
  }

  export type FeeWhereUniqueInput = Prisma.AtLeast<{
    feeId?: bigint | number
    AND?: FeeWhereInput | FeeWhereInput[]
    OR?: FeeWhereInput[]
    NOT?: FeeWhereInput | FeeWhereInput[]
    percentage?: DecimalFilter<"Fee"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Fee"> | Date | string
    updatedAt?: DateTimeFilter<"Fee"> | Date | string
    event?: EventListRelationFilter
  }, "feeId">

  export type FeeOrderByWithAggregationInput = {
    feeId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeeCountOrderByAggregateInput
    _avg?: FeeAvgOrderByAggregateInput
    _max?: FeeMaxOrderByAggregateInput
    _min?: FeeMinOrderByAggregateInput
    _sum?: FeeSumOrderByAggregateInput
  }

  export type FeeScalarWhereWithAggregatesInput = {
    AND?: FeeScalarWhereWithAggregatesInput | FeeScalarWhereWithAggregatesInput[]
    OR?: FeeScalarWhereWithAggregatesInput[]
    NOT?: FeeScalarWhereWithAggregatesInput | FeeScalarWhereWithAggregatesInput[]
    feeId?: BigIntWithAggregatesFilter<"Fee"> | bigint | number
    percentage?: DecimalWithAggregatesFilter<"Fee"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Fee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Fee"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    eventId?: BigIntFilter<"Event"> | bigint | number
    organizerId?: BigIntFilter<"Event"> | bigint | number
    feeId?: BigIntNullableFilter<"Event"> | bigint | number | null
    title?: StringFilter<"Event"> | string
    status?: EnumEVENT_STATUSFilter<"Event"> | $Enums.EVENT_STATUS
    inPerson?: BoolFilter<"Event"> | boolean
    description?: StringFilter<"Event"> | string
    accessPolicy?: EnumACCESS_POLICYFilter<"Event"> | $Enums.ACCESS_POLICY
    accessPolicyDescription?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizer?: XOR<OrganizerScalarRelationFilter, OrganizerWhereInput>
    venue?: XOR<VenueNullableScalarRelationFilter, VenueWhereInput> | null
    fee?: XOR<FeeNullableScalarRelationFilter, FeeWhereInput> | null
    categories?: EventToCategoryListRelationFilter
    dates?: EventDateListRelationFilter
    salesPhases?: EventSalesPhaseListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrderInput | SortOrder
    title?: SortOrder
    status?: SortOrder
    inPerson?: SortOrder
    description?: SortOrder
    accessPolicy?: SortOrder
    accessPolicyDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizer?: OrganizerOrderByWithRelationInput
    venue?: VenueOrderByWithRelationInput
    fee?: FeeOrderByWithRelationInput
    categories?: EventToCategoryOrderByRelationAggregateInput
    dates?: EventDateOrderByRelationAggregateInput
    salesPhases?: EventSalesPhaseOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: bigint | number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    organizerId?: BigIntFilter<"Event"> | bigint | number
    feeId?: BigIntNullableFilter<"Event"> | bigint | number | null
    title?: StringFilter<"Event"> | string
    status?: EnumEVENT_STATUSFilter<"Event"> | $Enums.EVENT_STATUS
    inPerson?: BoolFilter<"Event"> | boolean
    description?: StringFilter<"Event"> | string
    accessPolicy?: EnumACCESS_POLICYFilter<"Event"> | $Enums.ACCESS_POLICY
    accessPolicyDescription?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizer?: XOR<OrganizerScalarRelationFilter, OrganizerWhereInput>
    venue?: XOR<VenueNullableScalarRelationFilter, VenueWhereInput> | null
    fee?: XOR<FeeNullableScalarRelationFilter, FeeWhereInput> | null
    categories?: EventToCategoryListRelationFilter
    dates?: EventDateListRelationFilter
    salesPhases?: EventSalesPhaseListRelationFilter
  }, "eventId">

  export type EventOrderByWithAggregationInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrderInput | SortOrder
    title?: SortOrder
    status?: SortOrder
    inPerson?: SortOrder
    description?: SortOrder
    accessPolicy?: SortOrder
    accessPolicyDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    eventId?: BigIntWithAggregatesFilter<"Event"> | bigint | number
    organizerId?: BigIntWithAggregatesFilter<"Event"> | bigint | number
    feeId?: BigIntNullableWithAggregatesFilter<"Event"> | bigint | number | null
    title?: StringWithAggregatesFilter<"Event"> | string
    status?: EnumEVENT_STATUSWithAggregatesFilter<"Event"> | $Enums.EVENT_STATUS
    inPerson?: BoolWithAggregatesFilter<"Event"> | boolean
    description?: StringWithAggregatesFilter<"Event"> | string
    accessPolicy?: EnumACCESS_POLICYWithAggregatesFilter<"Event"> | $Enums.ACCESS_POLICY
    accessPolicyDescription?: StringNullableWithAggregatesFilter<"Event"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type EventDateWhereInput = {
    AND?: EventDateWhereInput | EventDateWhereInput[]
    OR?: EventDateWhereInput[]
    NOT?: EventDateWhereInput | EventDateWhereInput[]
    eventDateId?: BigIntFilter<"EventDate"> | bigint | number
    eventId?: BigIntFilter<"EventDate"> | bigint | number
    startAt?: DateTimeFilter<"EventDate"> | Date | string
    endAt?: DateTimeFilter<"EventDate"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    zoneDates?: EventDateZoneListRelationFilter
  }

  export type EventDateOrderByWithRelationInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    event?: EventOrderByWithRelationInput
    zoneDates?: EventDateZoneOrderByRelationAggregateInput
  }

  export type EventDateWhereUniqueInput = Prisma.AtLeast<{
    eventDateId?: bigint | number
    AND?: EventDateWhereInput | EventDateWhereInput[]
    OR?: EventDateWhereInput[]
    NOT?: EventDateWhereInput | EventDateWhereInput[]
    eventId?: BigIntFilter<"EventDate"> | bigint | number
    startAt?: DateTimeFilter<"EventDate"> | Date | string
    endAt?: DateTimeFilter<"EventDate"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    zoneDates?: EventDateZoneListRelationFilter
  }, "eventDateId">

  export type EventDateOrderByWithAggregationInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    _count?: EventDateCountOrderByAggregateInput
    _avg?: EventDateAvgOrderByAggregateInput
    _max?: EventDateMaxOrderByAggregateInput
    _min?: EventDateMinOrderByAggregateInput
    _sum?: EventDateSumOrderByAggregateInput
  }

  export type EventDateScalarWhereWithAggregatesInput = {
    AND?: EventDateScalarWhereWithAggregatesInput | EventDateScalarWhereWithAggregatesInput[]
    OR?: EventDateScalarWhereWithAggregatesInput[]
    NOT?: EventDateScalarWhereWithAggregatesInput | EventDateScalarWhereWithAggregatesInput[]
    eventDateId?: BigIntWithAggregatesFilter<"EventDate"> | bigint | number
    eventId?: BigIntWithAggregatesFilter<"EventDate"> | bigint | number
    startAt?: DateTimeWithAggregatesFilter<"EventDate"> | Date | string
    endAt?: DateTimeWithAggregatesFilter<"EventDate"> | Date | string
  }

  export type EventDateZoneWhereInput = {
    AND?: EventDateZoneWhereInput | EventDateZoneWhereInput[]
    OR?: EventDateZoneWhereInput[]
    NOT?: EventDateZoneWhereInput | EventDateZoneWhereInput[]
    eventDateZoneId?: BigIntFilter<"EventDateZone"> | bigint | number
    eventDateId?: BigIntFilter<"EventDateZone"> | bigint | number
    name?: StringFilter<"EventDateZone"> | string
    kind?: EnumZONE_KINDFilter<"EventDateZone"> | $Enums.ZONE_KIND
    basePrice?: DecimalFilter<"EventDateZone"> | Decimal | DecimalJsLike | number | string
    capacity?: IntFilter<"EventDateZone"> | number
    capacityRemaining?: IntFilter<"EventDateZone"> | number
    seatMapId?: BigIntNullableFilter<"EventDateZone"> | bigint | number | null
    currency?: EnumCURRENCYFilter<"EventDateZone"> | $Enums.CURRENCY
    createdAt?: DateTimeFilter<"EventDateZone"> | Date | string
    updatedAt?: DateTimeFilter<"EventDateZone"> | Date | string
    eventDate?: XOR<EventDateScalarRelationFilter, EventDateWhereInput>
    seatMap?: XOR<SeatMapNullableScalarRelationFilter, SeatMapWhereInput> | null
    allocations?: EventDateZoneAllocationListRelationFilter
  }

  export type EventDateZoneOrderByWithRelationInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    name?: SortOrder
    kind?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrderInput | SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventDate?: EventDateOrderByWithRelationInput
    seatMap?: SeatMapOrderByWithRelationInput
    allocations?: EventDateZoneAllocationOrderByRelationAggregateInput
  }

  export type EventDateZoneWhereUniqueInput = Prisma.AtLeast<{
    eventDateZoneId?: bigint | number
    seatMapId?: bigint | number
    AND?: EventDateZoneWhereInput | EventDateZoneWhereInput[]
    OR?: EventDateZoneWhereInput[]
    NOT?: EventDateZoneWhereInput | EventDateZoneWhereInput[]
    eventDateId?: BigIntFilter<"EventDateZone"> | bigint | number
    name?: StringFilter<"EventDateZone"> | string
    kind?: EnumZONE_KINDFilter<"EventDateZone"> | $Enums.ZONE_KIND
    basePrice?: DecimalFilter<"EventDateZone"> | Decimal | DecimalJsLike | number | string
    capacity?: IntFilter<"EventDateZone"> | number
    capacityRemaining?: IntFilter<"EventDateZone"> | number
    currency?: EnumCURRENCYFilter<"EventDateZone"> | $Enums.CURRENCY
    createdAt?: DateTimeFilter<"EventDateZone"> | Date | string
    updatedAt?: DateTimeFilter<"EventDateZone"> | Date | string
    eventDate?: XOR<EventDateScalarRelationFilter, EventDateWhereInput>
    seatMap?: XOR<SeatMapNullableScalarRelationFilter, SeatMapWhereInput> | null
    allocations?: EventDateZoneAllocationListRelationFilter
  }, "eventDateZoneId" | "seatMapId">

  export type EventDateZoneOrderByWithAggregationInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    name?: SortOrder
    kind?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrderInput | SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventDateZoneCountOrderByAggregateInput
    _avg?: EventDateZoneAvgOrderByAggregateInput
    _max?: EventDateZoneMaxOrderByAggregateInput
    _min?: EventDateZoneMinOrderByAggregateInput
    _sum?: EventDateZoneSumOrderByAggregateInput
  }

  export type EventDateZoneScalarWhereWithAggregatesInput = {
    AND?: EventDateZoneScalarWhereWithAggregatesInput | EventDateZoneScalarWhereWithAggregatesInput[]
    OR?: EventDateZoneScalarWhereWithAggregatesInput[]
    NOT?: EventDateZoneScalarWhereWithAggregatesInput | EventDateZoneScalarWhereWithAggregatesInput[]
    eventDateZoneId?: BigIntWithAggregatesFilter<"EventDateZone"> | bigint | number
    eventDateId?: BigIntWithAggregatesFilter<"EventDateZone"> | bigint | number
    name?: StringWithAggregatesFilter<"EventDateZone"> | string
    kind?: EnumZONE_KINDWithAggregatesFilter<"EventDateZone"> | $Enums.ZONE_KIND
    basePrice?: DecimalWithAggregatesFilter<"EventDateZone"> | Decimal | DecimalJsLike | number | string
    capacity?: IntWithAggregatesFilter<"EventDateZone"> | number
    capacityRemaining?: IntWithAggregatesFilter<"EventDateZone"> | number
    seatMapId?: BigIntNullableWithAggregatesFilter<"EventDateZone"> | bigint | number | null
    currency?: EnumCURRENCYWithAggregatesFilter<"EventDateZone"> | $Enums.CURRENCY
    createdAt?: DateTimeWithAggregatesFilter<"EventDateZone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventDateZone"> | Date | string
  }

  export type SeatMapWhereInput = {
    AND?: SeatMapWhereInput | SeatMapWhereInput[]
    OR?: SeatMapWhereInput[]
    NOT?: SeatMapWhereInput | SeatMapWhereInput[]
    seatMapId?: BigIntFilter<"SeatMap"> | bigint | number
    rows?: IntFilter<"SeatMap"> | number
    cols?: IntFilter<"SeatMap"> | number
    createdAt?: DateTimeFilter<"SeatMap"> | Date | string
    updatedAt?: DateTimeFilter<"SeatMap"> | Date | string
    occupiedSeats?: SeatListRelationFilter
    EventDateZone?: XOR<EventDateZoneNullableScalarRelationFilter, EventDateZoneWhereInput> | null
  }

  export type SeatMapOrderByWithRelationInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    occupiedSeats?: SeatOrderByRelationAggregateInput
    EventDateZone?: EventDateZoneOrderByWithRelationInput
  }

  export type SeatMapWhereUniqueInput = Prisma.AtLeast<{
    seatMapId?: bigint | number
    AND?: SeatMapWhereInput | SeatMapWhereInput[]
    OR?: SeatMapWhereInput[]
    NOT?: SeatMapWhereInput | SeatMapWhereInput[]
    rows?: IntFilter<"SeatMap"> | number
    cols?: IntFilter<"SeatMap"> | number
    createdAt?: DateTimeFilter<"SeatMap"> | Date | string
    updatedAt?: DateTimeFilter<"SeatMap"> | Date | string
    occupiedSeats?: SeatListRelationFilter
    EventDateZone?: XOR<EventDateZoneNullableScalarRelationFilter, EventDateZoneWhereInput> | null
  }, "seatMapId">

  export type SeatMapOrderByWithAggregationInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SeatMapCountOrderByAggregateInput
    _avg?: SeatMapAvgOrderByAggregateInput
    _max?: SeatMapMaxOrderByAggregateInput
    _min?: SeatMapMinOrderByAggregateInput
    _sum?: SeatMapSumOrderByAggregateInput
  }

  export type SeatMapScalarWhereWithAggregatesInput = {
    AND?: SeatMapScalarWhereWithAggregatesInput | SeatMapScalarWhereWithAggregatesInput[]
    OR?: SeatMapScalarWhereWithAggregatesInput[]
    NOT?: SeatMapScalarWhereWithAggregatesInput | SeatMapScalarWhereWithAggregatesInput[]
    seatMapId?: BigIntWithAggregatesFilter<"SeatMap"> | bigint | number
    rows?: IntWithAggregatesFilter<"SeatMap"> | number
    cols?: IntWithAggregatesFilter<"SeatMap"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SeatMap"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SeatMap"> | Date | string
  }

  export type SeatWhereInput = {
    AND?: SeatWhereInput | SeatWhereInput[]
    OR?: SeatWhereInput[]
    NOT?: SeatWhereInput | SeatWhereInput[]
    seatId?: BigIntFilter<"Seat"> | bigint | number
    seatMapId?: BigIntFilter<"Seat"> | bigint | number
    rowNumber?: IntFilter<"Seat"> | number
    colNumber?: IntFilter<"Seat"> | number
    seatMap?: XOR<SeatMapScalarRelationFilter, SeatMapWhereInput>
  }

  export type SeatOrderByWithRelationInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
    seatMap?: SeatMapOrderByWithRelationInput
  }

  export type SeatWhereUniqueInput = Prisma.AtLeast<{
    seatId?: bigint | number
    seatMapId_rowNumber_colNumber?: SeatSeatMapIdRowNumberColNumberCompoundUniqueInput
    AND?: SeatWhereInput | SeatWhereInput[]
    OR?: SeatWhereInput[]
    NOT?: SeatWhereInput | SeatWhereInput[]
    seatMapId?: BigIntFilter<"Seat"> | bigint | number
    rowNumber?: IntFilter<"Seat"> | number
    colNumber?: IntFilter<"Seat"> | number
    seatMap?: XOR<SeatMapScalarRelationFilter, SeatMapWhereInput>
  }, "seatId" | "seatMapId_rowNumber_colNumber">

  export type SeatOrderByWithAggregationInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
    _count?: SeatCountOrderByAggregateInput
    _avg?: SeatAvgOrderByAggregateInput
    _max?: SeatMaxOrderByAggregateInput
    _min?: SeatMinOrderByAggregateInput
    _sum?: SeatSumOrderByAggregateInput
  }

  export type SeatScalarWhereWithAggregatesInput = {
    AND?: SeatScalarWhereWithAggregatesInput | SeatScalarWhereWithAggregatesInput[]
    OR?: SeatScalarWhereWithAggregatesInput[]
    NOT?: SeatScalarWhereWithAggregatesInput | SeatScalarWhereWithAggregatesInput[]
    seatId?: BigIntWithAggregatesFilter<"Seat"> | bigint | number
    seatMapId?: BigIntWithAggregatesFilter<"Seat"> | bigint | number
    rowNumber?: IntWithAggregatesFilter<"Seat"> | number
    colNumber?: IntWithAggregatesFilter<"Seat"> | number
  }

  export type EventDateZoneAllocationWhereInput = {
    AND?: EventDateZoneAllocationWhereInput | EventDateZoneAllocationWhereInput[]
    OR?: EventDateZoneAllocationWhereInput[]
    NOT?: EventDateZoneAllocationWhereInput | EventDateZoneAllocationWhereInput[]
    eventDateZoneAllocationId?: BigIntFilter<"EventDateZoneAllocation"> | bigint | number
    eventDateZoneId?: BigIntFilter<"EventDateZoneAllocation"> | bigint | number
    audienceName?: StringFilter<"EventDateZoneAllocation"> | string
    discountPercent?: DecimalFilter<"EventDateZoneAllocation"> | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFilter<"EventDateZoneAllocation"> | number
    remainingQuantity?: IntNullableFilter<"EventDateZoneAllocation"> | number | null
    createdAt?: DateTimeFilter<"EventDateZoneAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"EventDateZoneAllocation"> | Date | string
    zone?: XOR<EventDateZoneScalarRelationFilter, EventDateZoneWhereInput>
  }

  export type EventDateZoneAllocationOrderByWithRelationInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    audienceName?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    zone?: EventDateZoneOrderByWithRelationInput
  }

  export type EventDateZoneAllocationWhereUniqueInput = Prisma.AtLeast<{
    eventDateZoneAllocationId?: bigint | number
    AND?: EventDateZoneAllocationWhereInput | EventDateZoneAllocationWhereInput[]
    OR?: EventDateZoneAllocationWhereInput[]
    NOT?: EventDateZoneAllocationWhereInput | EventDateZoneAllocationWhereInput[]
    eventDateZoneId?: BigIntFilter<"EventDateZoneAllocation"> | bigint | number
    audienceName?: StringFilter<"EventDateZoneAllocation"> | string
    discountPercent?: DecimalFilter<"EventDateZoneAllocation"> | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFilter<"EventDateZoneAllocation"> | number
    remainingQuantity?: IntNullableFilter<"EventDateZoneAllocation"> | number | null
    createdAt?: DateTimeFilter<"EventDateZoneAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"EventDateZoneAllocation"> | Date | string
    zone?: XOR<EventDateZoneScalarRelationFilter, EventDateZoneWhereInput>
  }, "eventDateZoneAllocationId">

  export type EventDateZoneAllocationOrderByWithAggregationInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    audienceName?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventDateZoneAllocationCountOrderByAggregateInput
    _avg?: EventDateZoneAllocationAvgOrderByAggregateInput
    _max?: EventDateZoneAllocationMaxOrderByAggregateInput
    _min?: EventDateZoneAllocationMinOrderByAggregateInput
    _sum?: EventDateZoneAllocationSumOrderByAggregateInput
  }

  export type EventDateZoneAllocationScalarWhereWithAggregatesInput = {
    AND?: EventDateZoneAllocationScalarWhereWithAggregatesInput | EventDateZoneAllocationScalarWhereWithAggregatesInput[]
    OR?: EventDateZoneAllocationScalarWhereWithAggregatesInput[]
    NOT?: EventDateZoneAllocationScalarWhereWithAggregatesInput | EventDateZoneAllocationScalarWhereWithAggregatesInput[]
    eventDateZoneAllocationId?: BigIntWithAggregatesFilter<"EventDateZoneAllocation"> | bigint | number
    eventDateZoneId?: BigIntWithAggregatesFilter<"EventDateZoneAllocation"> | bigint | number
    audienceName?: StringWithAggregatesFilter<"EventDateZoneAllocation"> | string
    discountPercent?: DecimalWithAggregatesFilter<"EventDateZoneAllocation"> | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntWithAggregatesFilter<"EventDateZoneAllocation"> | number
    remainingQuantity?: IntNullableWithAggregatesFilter<"EventDateZoneAllocation"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"EventDateZoneAllocation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventDateZoneAllocation"> | Date | string
  }

  export type EventSalesPhaseWhereInput = {
    AND?: EventSalesPhaseWhereInput | EventSalesPhaseWhereInput[]
    OR?: EventSalesPhaseWhereInput[]
    NOT?: EventSalesPhaseWhereInput | EventSalesPhaseWhereInput[]
    eventSalesPhaseId?: BigIntFilter<"EventSalesPhase"> | bigint | number
    eventId?: BigIntFilter<"EventSalesPhase"> | bigint | number
    name?: StringFilter<"EventSalesPhase"> | string
    startAt?: DateTimeNullableFilter<"EventSalesPhase"> | Date | string | null
    endAt?: DateTimeNullableFilter<"EventSalesPhase"> | Date | string | null
    percentage?: DecimalFilter<"EventSalesPhase"> | Decimal | DecimalJsLike | number | string
    active?: BoolFilter<"EventSalesPhase"> | boolean
    createdAt?: DateTimeFilter<"EventSalesPhase"> | Date | string
    updatedAt?: DateTimeFilter<"EventSalesPhase"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type EventSalesPhaseOrderByWithRelationInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    percentage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type EventSalesPhaseWhereUniqueInput = Prisma.AtLeast<{
    eventSalesPhaseId?: bigint | number
    AND?: EventSalesPhaseWhereInput | EventSalesPhaseWhereInput[]
    OR?: EventSalesPhaseWhereInput[]
    NOT?: EventSalesPhaseWhereInput | EventSalesPhaseWhereInput[]
    eventId?: BigIntFilter<"EventSalesPhase"> | bigint | number
    name?: StringFilter<"EventSalesPhase"> | string
    startAt?: DateTimeNullableFilter<"EventSalesPhase"> | Date | string | null
    endAt?: DateTimeNullableFilter<"EventSalesPhase"> | Date | string | null
    percentage?: DecimalFilter<"EventSalesPhase"> | Decimal | DecimalJsLike | number | string
    active?: BoolFilter<"EventSalesPhase"> | boolean
    createdAt?: DateTimeFilter<"EventSalesPhase"> | Date | string
    updatedAt?: DateTimeFilter<"EventSalesPhase"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "eventSalesPhaseId">

  export type EventSalesPhaseOrderByWithAggregationInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    percentage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventSalesPhaseCountOrderByAggregateInput
    _avg?: EventSalesPhaseAvgOrderByAggregateInput
    _max?: EventSalesPhaseMaxOrderByAggregateInput
    _min?: EventSalesPhaseMinOrderByAggregateInput
    _sum?: EventSalesPhaseSumOrderByAggregateInput
  }

  export type EventSalesPhaseScalarWhereWithAggregatesInput = {
    AND?: EventSalesPhaseScalarWhereWithAggregatesInput | EventSalesPhaseScalarWhereWithAggregatesInput[]
    OR?: EventSalesPhaseScalarWhereWithAggregatesInput[]
    NOT?: EventSalesPhaseScalarWhereWithAggregatesInput | EventSalesPhaseScalarWhereWithAggregatesInput[]
    eventSalesPhaseId?: BigIntWithAggregatesFilter<"EventSalesPhase"> | bigint | number
    eventId?: BigIntWithAggregatesFilter<"EventSalesPhase"> | bigint | number
    name?: StringWithAggregatesFilter<"EventSalesPhase"> | string
    startAt?: DateTimeNullableWithAggregatesFilter<"EventSalesPhase"> | Date | string | null
    endAt?: DateTimeNullableWithAggregatesFilter<"EventSalesPhase"> | Date | string | null
    percentage?: DecimalWithAggregatesFilter<"EventSalesPhase"> | Decimal | DecimalJsLike | number | string
    active?: BoolWithAggregatesFilter<"EventSalesPhase"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"EventSalesPhase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventSalesPhase"> | Date | string
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
    events?: EventCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateInput = {
    organizerId?: bigint | number
    userId: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUpdateInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrganizerNestedInput
    events?: EventUpdateManyWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
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

  export type EventCategoryCreateInput = {
    eventCategoryId?: bigint | number
    initials: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventToCategoryCreateNestedManyWithoutCategoryInput
  }

  export type EventCategoryUncheckedCreateInput = {
    eventCategoryId?: bigint | number
    initials: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventToCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type EventCategoryUpdateInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    initials?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventToCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type EventCategoryUncheckedUpdateInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    initials?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventToCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type EventCategoryCreateManyInput = {
    eventCategoryId?: bigint | number
    initials: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCategoryUpdateManyMutationInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    initials?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCategoryUncheckedUpdateManyInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    initials?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutCategoriesInput
    category: EventCategoryCreateNestedOneWithoutEventsInput
  }

  export type EventToCategoryUncheckedCreateInput = {
    eventId: bigint | number
    eventCategoryId: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventToCategoryUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutCategoriesNestedInput
    category?: EventCategoryUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventToCategoryUncheckedUpdateInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryCreateManyInput = {
    eventId: bigint | number
    eventCategoryId: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventToCategoryUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryUncheckedUpdateManyInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueCreateInput = {
    venueId?: bigint | number
    city?: string | null
    address?: string | null
    addressUrl?: string | null
    reference?: string | null
    capacity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutVenueInput
  }

  export type VenueUncheckedCreateInput = {
    venueId?: bigint | number
    eventId: bigint | number
    city?: string | null
    address?: string | null
    addressUrl?: string | null
    reference?: string | null
    capacity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUpdateInput = {
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateInput = {
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueCreateManyInput = {
    venueId?: bigint | number
    eventId: bigint | number
    city?: string | null
    address?: string | null
    addressUrl?: string | null
    reference?: string | null
    capacity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUpdateManyMutationInput = {
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateManyInput = {
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeCreateInput = {
    feeId?: bigint | number
    percentage: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    event?: EventCreateNestedManyWithoutFeeInput
  }

  export type FeeUncheckedCreateInput = {
    feeId?: bigint | number
    percentage: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    event?: EventUncheckedCreateNestedManyWithoutFeeInput
  }

  export type FeeUpdateInput = {
    feeId?: BigIntFieldUpdateOperationsInput | bigint | number
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateManyWithoutFeeNestedInput
  }

  export type FeeUncheckedUpdateInput = {
    feeId?: BigIntFieldUpdateOperationsInput | bigint | number
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUncheckedUpdateManyWithoutFeeNestedInput
  }

  export type FeeCreateManyInput = {
    feeId?: bigint | number
    percentage: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeeUpdateManyMutationInput = {
    feeId?: BigIntFieldUpdateOperationsInput | bigint | number
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeUncheckedUpdateManyInput = {
    feeId?: BigIntFieldUpdateOperationsInput | bigint | number
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventInput
    fee?: FeeCreateNestedOneWithoutEventInput
    categories?: EventToCategoryCreateNestedManyWithoutEventInput
    dates?: EventDateCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueUncheckedCreateNestedOneWithoutEventInput
    categories?: EventToCategoryUncheckedCreateNestedManyWithoutEventInput
    dates?: EventDateUncheckedCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventNestedInput
    fee?: FeeUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUpdateManyWithoutEventNestedInput
    dates?: EventDateUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUncheckedUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUncheckedUpdateManyWithoutEventNestedInput
    dates?: EventDateUncheckedUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateCreateInput = {
    eventDateId?: bigint | number
    startAt: Date | string
    endAt: Date | string
    event: EventCreateNestedOneWithoutDatesInput
    zoneDates?: EventDateZoneCreateNestedManyWithoutEventDateInput
  }

  export type EventDateUncheckedCreateInput = {
    eventDateId?: bigint | number
    eventId: bigint | number
    startAt: Date | string
    endAt: Date | string
    zoneDates?: EventDateZoneUncheckedCreateNestedManyWithoutEventDateInput
  }

  export type EventDateUpdateInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutDatesNestedInput
    zoneDates?: EventDateZoneUpdateManyWithoutEventDateNestedInput
  }

  export type EventDateUncheckedUpdateInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    zoneDates?: EventDateZoneUncheckedUpdateManyWithoutEventDateNestedInput
  }

  export type EventDateCreateManyInput = {
    eventDateId?: bigint | number
    eventId: bigint | number
    startAt: Date | string
    endAt: Date | string
  }

  export type EventDateUpdateManyMutationInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateUncheckedUpdateManyInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneCreateInput = {
    eventDateZoneId?: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    eventDate: EventDateCreateNestedOneWithoutZoneDatesInput
    seatMap?: SeatMapCreateNestedOneWithoutEventDateZoneInput
    allocations?: EventDateZoneAllocationCreateNestedManyWithoutZoneInput
  }

  export type EventDateZoneUncheckedCreateInput = {
    eventDateZoneId?: bigint | number
    eventDateId: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    seatMapId?: bigint | number | null
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    allocations?: EventDateZoneAllocationUncheckedCreateNestedManyWithoutZoneInput
  }

  export type EventDateZoneUpdateInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventDate?: EventDateUpdateOneRequiredWithoutZoneDatesNestedInput
    seatMap?: SeatMapUpdateOneWithoutEventDateZoneNestedInput
    allocations?: EventDateZoneAllocationUpdateManyWithoutZoneNestedInput
  }

  export type EventDateZoneUncheckedUpdateInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    seatMapId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: EventDateZoneAllocationUncheckedUpdateManyWithoutZoneNestedInput
  }

  export type EventDateZoneCreateManyInput = {
    eventDateZoneId?: bigint | number
    eventDateId: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    seatMapId?: bigint | number | null
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneUpdateManyMutationInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneUncheckedUpdateManyInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    seatMapId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatMapCreateInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
    occupiedSeats?: SeatCreateNestedManyWithoutSeatMapInput
    EventDateZone?: EventDateZoneCreateNestedOneWithoutSeatMapInput
  }

  export type SeatMapUncheckedCreateInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
    occupiedSeats?: SeatUncheckedCreateNestedManyWithoutSeatMapInput
    EventDateZone?: EventDateZoneUncheckedCreateNestedOneWithoutSeatMapInput
  }

  export type SeatMapUpdateInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    occupiedSeats?: SeatUpdateManyWithoutSeatMapNestedInput
    EventDateZone?: EventDateZoneUpdateOneWithoutSeatMapNestedInput
  }

  export type SeatMapUncheckedUpdateInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    occupiedSeats?: SeatUncheckedUpdateManyWithoutSeatMapNestedInput
    EventDateZone?: EventDateZoneUncheckedUpdateOneWithoutSeatMapNestedInput
  }

  export type SeatMapCreateManyInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SeatMapUpdateManyMutationInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatMapUncheckedUpdateManyInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatCreateInput = {
    seatId?: bigint | number
    rowNumber: number
    colNumber: number
    seatMap: SeatMapCreateNestedOneWithoutOccupiedSeatsInput
  }

  export type SeatUncheckedCreateInput = {
    seatId?: bigint | number
    seatMapId: bigint | number
    rowNumber: number
    colNumber: number
  }

  export type SeatUpdateInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
    seatMap?: SeatMapUpdateOneRequiredWithoutOccupiedSeatsNestedInput
  }

  export type SeatUncheckedUpdateInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
  }

  export type SeatCreateManyInput = {
    seatId?: bigint | number
    seatMapId: bigint | number
    rowNumber: number
    colNumber: number
  }

  export type SeatUpdateManyMutationInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
  }

  export type SeatUncheckedUpdateManyInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
  }

  export type EventDateZoneAllocationCreateInput = {
    eventDateZoneAllocationId?: bigint | number
    audienceName: string
    discountPercent: Decimal | DecimalJsLike | number | string
    allocatedQuantity: number
    remainingQuantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    zone: EventDateZoneCreateNestedOneWithoutAllocationsInput
  }

  export type EventDateZoneAllocationUncheckedCreateInput = {
    eventDateZoneAllocationId?: bigint | number
    eventDateZoneId: bigint | number
    audienceName: string
    discountPercent: Decimal | DecimalJsLike | number | string
    allocatedQuantity: number
    remainingQuantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneAllocationUpdateInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    zone?: EventDateZoneUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type EventDateZoneAllocationUncheckedUpdateInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneAllocationCreateManyInput = {
    eventDateZoneAllocationId?: bigint | number
    eventDateZoneId: bigint | number
    audienceName: string
    discountPercent: Decimal | DecimalJsLike | number | string
    allocatedQuantity: number
    remainingQuantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneAllocationUpdateManyMutationInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneAllocationUncheckedUpdateManyInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventSalesPhaseCreateInput = {
    eventSalesPhaseId?: bigint | number
    name: string
    startAt?: Date | string | null
    endAt?: Date | string | null
    percentage: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutSalesPhasesInput
  }

  export type EventSalesPhaseUncheckedCreateInput = {
    eventSalesPhaseId?: bigint | number
    eventId: bigint | number
    name: string
    startAt?: Date | string | null
    endAt?: Date | string | null
    percentage: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventSalesPhaseUpdateInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutSalesPhasesNestedInput
  }

  export type EventSalesPhaseUncheckedUpdateInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventSalesPhaseCreateManyInput = {
    eventSalesPhaseId?: bigint | number
    eventId: bigint | number
    name: string
    startAt?: Date | string | null
    endAt?: Date | string | null
    percentage: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventSalesPhaseUpdateManyMutationInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventSalesPhaseUncheckedUpdateManyInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
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

  export type EventToCategoryListRelationFilter = {
    every?: EventToCategoryWhereInput
    some?: EventToCategoryWhereInput
    none?: EventToCategoryWhereInput
  }

  export type EventToCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCategoryCountOrderByAggregateInput = {
    eventCategoryId?: SortOrder
    initials?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventCategoryAvgOrderByAggregateInput = {
    eventCategoryId?: SortOrder
  }

  export type EventCategoryMaxOrderByAggregateInput = {
    eventCategoryId?: SortOrder
    initials?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventCategoryMinOrderByAggregateInput = {
    eventCategoryId?: SortOrder
    initials?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventCategorySumOrderByAggregateInput = {
    eventCategoryId?: SortOrder
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type EventCategoryScalarRelationFilter = {
    is?: EventCategoryWhereInput
    isNot?: EventCategoryWhereInput
  }

  export type EventToCategoryEventIdEventCategoryIdCompoundUniqueInput = {
    eventId: bigint | number
    eventCategoryId: bigint | number
  }

  export type EventToCategoryCountOrderByAggregateInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventToCategoryAvgOrderByAggregateInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
  }

  export type EventToCategoryMaxOrderByAggregateInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventToCategoryMinOrderByAggregateInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventToCategorySumOrderByAggregateInput = {
    eventId?: SortOrder
    eventCategoryId?: SortOrder
  }

  export type VenueCountOrderByAggregateInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    city?: SortOrder
    address?: SortOrder
    addressUrl?: SortOrder
    reference?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueAvgOrderByAggregateInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    capacity?: SortOrder
  }

  export type VenueMaxOrderByAggregateInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    city?: SortOrder
    address?: SortOrder
    addressUrl?: SortOrder
    reference?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueMinOrderByAggregateInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    city?: SortOrder
    address?: SortOrder
    addressUrl?: SortOrder
    reference?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueSumOrderByAggregateInput = {
    venueId?: SortOrder
    eventId?: SortOrder
    capacity?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type FeeCountOrderByAggregateInput = {
    feeId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeAvgOrderByAggregateInput = {
    feeId?: SortOrder
    percentage?: SortOrder
  }

  export type FeeMaxOrderByAggregateInput = {
    feeId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeMinOrderByAggregateInput = {
    feeId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeSumOrderByAggregateInput = {
    feeId?: SortOrder
    percentage?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumEVENT_STATUSFilter<$PrismaModel = never> = {
    equals?: $Enums.EVENT_STATUS | EnumEVENT_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumEVENT_STATUSFilter<$PrismaModel> | $Enums.EVENT_STATUS
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumACCESS_POLICYFilter<$PrismaModel = never> = {
    equals?: $Enums.ACCESS_POLICY | EnumACCESS_POLICYFieldRefInput<$PrismaModel>
    in?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    not?: NestedEnumACCESS_POLICYFilter<$PrismaModel> | $Enums.ACCESS_POLICY
  }

  export type OrganizerScalarRelationFilter = {
    is?: OrganizerWhereInput
    isNot?: OrganizerWhereInput
  }

  export type VenueNullableScalarRelationFilter = {
    is?: VenueWhereInput | null
    isNot?: VenueWhereInput | null
  }

  export type FeeNullableScalarRelationFilter = {
    is?: FeeWhereInput | null
    isNot?: FeeWhereInput | null
  }

  export type EventDateListRelationFilter = {
    every?: EventDateWhereInput
    some?: EventDateWhereInput
    none?: EventDateWhereInput
  }

  export type EventSalesPhaseListRelationFilter = {
    every?: EventSalesPhaseWhereInput
    some?: EventSalesPhaseWhereInput
    none?: EventSalesPhaseWhereInput
  }

  export type EventDateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventSalesPhaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    inPerson?: SortOrder
    description?: SortOrder
    accessPolicy?: SortOrder
    accessPolicyDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    inPerson?: SortOrder
    description?: SortOrder
    accessPolicy?: SortOrder
    accessPolicyDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    inPerson?: SortOrder
    description?: SortOrder
    accessPolicy?: SortOrder
    accessPolicyDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    eventId?: SortOrder
    organizerId?: SortOrder
    feeId?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumEVENT_STATUSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EVENT_STATUS | EnumEVENT_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumEVENT_STATUSWithAggregatesFilter<$PrismaModel> | $Enums.EVENT_STATUS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEVENT_STATUSFilter<$PrismaModel>
    _max?: NestedEnumEVENT_STATUSFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumACCESS_POLICYWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ACCESS_POLICY | EnumACCESS_POLICYFieldRefInput<$PrismaModel>
    in?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    not?: NestedEnumACCESS_POLICYWithAggregatesFilter<$PrismaModel> | $Enums.ACCESS_POLICY
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumACCESS_POLICYFilter<$PrismaModel>
    _max?: NestedEnumACCESS_POLICYFilter<$PrismaModel>
  }

  export type EventDateZoneListRelationFilter = {
    every?: EventDateZoneWhereInput
    some?: EventDateZoneWhereInput
    none?: EventDateZoneWhereInput
  }

  export type EventDateZoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventDateCountOrderByAggregateInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
  }

  export type EventDateAvgOrderByAggregateInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
  }

  export type EventDateMaxOrderByAggregateInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
  }

  export type EventDateMinOrderByAggregateInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
  }

  export type EventDateSumOrderByAggregateInput = {
    eventDateId?: SortOrder
    eventId?: SortOrder
  }

  export type EnumZONE_KINDFilter<$PrismaModel = never> = {
    equals?: $Enums.ZONE_KIND | EnumZONE_KINDFieldRefInput<$PrismaModel>
    in?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    not?: NestedEnumZONE_KINDFilter<$PrismaModel> | $Enums.ZONE_KIND
  }

  export type EnumCURRENCYFilter<$PrismaModel = never> = {
    equals?: $Enums.CURRENCY | EnumCURRENCYFieldRefInput<$PrismaModel>
    in?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    notIn?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    not?: NestedEnumCURRENCYFilter<$PrismaModel> | $Enums.CURRENCY
  }

  export type EventDateScalarRelationFilter = {
    is?: EventDateWhereInput
    isNot?: EventDateWhereInput
  }

  export type SeatMapNullableScalarRelationFilter = {
    is?: SeatMapWhereInput | null
    isNot?: SeatMapWhereInput | null
  }

  export type EventDateZoneAllocationListRelationFilter = {
    every?: EventDateZoneAllocationWhereInput
    some?: EventDateZoneAllocationWhereInput
    none?: EventDateZoneAllocationWhereInput
  }

  export type EventDateZoneAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventDateZoneCountOrderByAggregateInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    name?: SortOrder
    kind?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDateZoneAvgOrderByAggregateInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrder
  }

  export type EventDateZoneMaxOrderByAggregateInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    name?: SortOrder
    kind?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDateZoneMinOrderByAggregateInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    name?: SortOrder
    kind?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDateZoneSumOrderByAggregateInput = {
    eventDateZoneId?: SortOrder
    eventDateId?: SortOrder
    basePrice?: SortOrder
    capacity?: SortOrder
    capacityRemaining?: SortOrder
    seatMapId?: SortOrder
  }

  export type EnumZONE_KINDWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ZONE_KIND | EnumZONE_KINDFieldRefInput<$PrismaModel>
    in?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    not?: NestedEnumZONE_KINDWithAggregatesFilter<$PrismaModel> | $Enums.ZONE_KIND
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumZONE_KINDFilter<$PrismaModel>
    _max?: NestedEnumZONE_KINDFilter<$PrismaModel>
  }

  export type EnumCURRENCYWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CURRENCY | EnumCURRENCYFieldRefInput<$PrismaModel>
    in?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    notIn?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    not?: NestedEnumCURRENCYWithAggregatesFilter<$PrismaModel> | $Enums.CURRENCY
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCURRENCYFilter<$PrismaModel>
    _max?: NestedEnumCURRENCYFilter<$PrismaModel>
  }

  export type SeatListRelationFilter = {
    every?: SeatWhereInput
    some?: SeatWhereInput
    none?: SeatWhereInput
  }

  export type EventDateZoneNullableScalarRelationFilter = {
    is?: EventDateZoneWhereInput | null
    isNot?: EventDateZoneWhereInput | null
  }

  export type SeatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SeatMapCountOrderByAggregateInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SeatMapAvgOrderByAggregateInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
  }

  export type SeatMapMaxOrderByAggregateInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SeatMapMinOrderByAggregateInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SeatMapSumOrderByAggregateInput = {
    seatMapId?: SortOrder
    rows?: SortOrder
    cols?: SortOrder
  }

  export type SeatMapScalarRelationFilter = {
    is?: SeatMapWhereInput
    isNot?: SeatMapWhereInput
  }

  export type SeatSeatMapIdRowNumberColNumberCompoundUniqueInput = {
    seatMapId: bigint | number
    rowNumber: number
    colNumber: number
  }

  export type SeatCountOrderByAggregateInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
  }

  export type SeatAvgOrderByAggregateInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
  }

  export type SeatMaxOrderByAggregateInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
  }

  export type SeatMinOrderByAggregateInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
  }

  export type SeatSumOrderByAggregateInput = {
    seatId?: SortOrder
    seatMapId?: SortOrder
    rowNumber?: SortOrder
    colNumber?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EventDateZoneScalarRelationFilter = {
    is?: EventDateZoneWhereInput
    isNot?: EventDateZoneWhereInput
  }

  export type EventDateZoneAllocationCountOrderByAggregateInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    audienceName?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDateZoneAllocationAvgOrderByAggregateInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrder
  }

  export type EventDateZoneAllocationMaxOrderByAggregateInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    audienceName?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDateZoneAllocationMinOrderByAggregateInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    audienceName?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDateZoneAllocationSumOrderByAggregateInput = {
    eventDateZoneAllocationId?: SortOrder
    eventDateZoneId?: SortOrder
    discountPercent?: SortOrder
    allocatedQuantity?: SortOrder
    remainingQuantity?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EventSalesPhaseCountOrderByAggregateInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    percentage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSalesPhaseAvgOrderByAggregateInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    percentage?: SortOrder
  }

  export type EventSalesPhaseMaxOrderByAggregateInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    percentage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSalesPhaseMinOrderByAggregateInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    percentage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSalesPhaseSumOrderByAggregateInput = {
    eventSalesPhaseId?: SortOrder
    eventId?: SortOrder
    percentage?: SortOrder
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

  export type EventCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
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

  export type EventUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type EventToCategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<EventToCategoryCreateWithoutCategoryInput, EventToCategoryUncheckedCreateWithoutCategoryInput> | EventToCategoryCreateWithoutCategoryInput[] | EventToCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutCategoryInput | EventToCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: EventToCategoryCreateManyCategoryInputEnvelope
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
  }

  export type EventToCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<EventToCategoryCreateWithoutCategoryInput, EventToCategoryUncheckedCreateWithoutCategoryInput> | EventToCategoryCreateWithoutCategoryInput[] | EventToCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutCategoryInput | EventToCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: EventToCategoryCreateManyCategoryInputEnvelope
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
  }

  export type EventToCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<EventToCategoryCreateWithoutCategoryInput, EventToCategoryUncheckedCreateWithoutCategoryInput> | EventToCategoryCreateWithoutCategoryInput[] | EventToCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutCategoryInput | EventToCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: EventToCategoryUpsertWithWhereUniqueWithoutCategoryInput | EventToCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: EventToCategoryCreateManyCategoryInputEnvelope
    set?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    disconnect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    delete?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    update?: EventToCategoryUpdateWithWhereUniqueWithoutCategoryInput | EventToCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: EventToCategoryUpdateManyWithWhereWithoutCategoryInput | EventToCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: EventToCategoryScalarWhereInput | EventToCategoryScalarWhereInput[]
  }

  export type EventToCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<EventToCategoryCreateWithoutCategoryInput, EventToCategoryUncheckedCreateWithoutCategoryInput> | EventToCategoryCreateWithoutCategoryInput[] | EventToCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutCategoryInput | EventToCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: EventToCategoryUpsertWithWhereUniqueWithoutCategoryInput | EventToCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: EventToCategoryCreateManyCategoryInputEnvelope
    set?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    disconnect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    delete?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    update?: EventToCategoryUpdateWithWhereUniqueWithoutCategoryInput | EventToCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: EventToCategoryUpdateManyWithWhereWithoutCategoryInput | EventToCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: EventToCategoryScalarWhereInput | EventToCategoryScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<EventCreateWithoutCategoriesInput, EventUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: EventCreateOrConnectWithoutCategoriesInput
    connect?: EventWhereUniqueInput
  }

  export type EventCategoryCreateNestedOneWithoutEventsInput = {
    create?: XOR<EventCategoryCreateWithoutEventsInput, EventCategoryUncheckedCreateWithoutEventsInput>
    connectOrCreate?: EventCategoryCreateOrConnectWithoutEventsInput
    connect?: EventCategoryWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<EventCreateWithoutCategoriesInput, EventUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: EventCreateOrConnectWithoutCategoriesInput
    upsert?: EventUpsertWithoutCategoriesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutCategoriesInput, EventUpdateWithoutCategoriesInput>, EventUncheckedUpdateWithoutCategoriesInput>
  }

  export type EventCategoryUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<EventCategoryCreateWithoutEventsInput, EventCategoryUncheckedCreateWithoutEventsInput>
    connectOrCreate?: EventCategoryCreateOrConnectWithoutEventsInput
    upsert?: EventCategoryUpsertWithoutEventsInput
    connect?: EventCategoryWhereUniqueInput
    update?: XOR<XOR<EventCategoryUpdateToOneWithWhereWithoutEventsInput, EventCategoryUpdateWithoutEventsInput>, EventCategoryUncheckedUpdateWithoutEventsInput>
  }

  export type EventCreateNestedOneWithoutVenueInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput
    connect?: EventWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutVenueNestedInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput
    upsert?: EventUpsertWithoutVenueInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutVenueInput, EventUpdateWithoutVenueInput>, EventUncheckedUpdateWithoutVenueInput>
  }

  export type EventCreateNestedManyWithoutFeeInput = {
    create?: XOR<EventCreateWithoutFeeInput, EventUncheckedCreateWithoutFeeInput> | EventCreateWithoutFeeInput[] | EventUncheckedCreateWithoutFeeInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFeeInput | EventCreateOrConnectWithoutFeeInput[]
    createMany?: EventCreateManyFeeInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutFeeInput = {
    create?: XOR<EventCreateWithoutFeeInput, EventUncheckedCreateWithoutFeeInput> | EventCreateWithoutFeeInput[] | EventUncheckedCreateWithoutFeeInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFeeInput | EventCreateOrConnectWithoutFeeInput[]
    createMany?: EventCreateManyFeeInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EventUpdateManyWithoutFeeNestedInput = {
    create?: XOR<EventCreateWithoutFeeInput, EventUncheckedCreateWithoutFeeInput> | EventCreateWithoutFeeInput[] | EventUncheckedCreateWithoutFeeInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFeeInput | EventCreateOrConnectWithoutFeeInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutFeeInput | EventUpsertWithWhereUniqueWithoutFeeInput[]
    createMany?: EventCreateManyFeeInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutFeeInput | EventUpdateWithWhereUniqueWithoutFeeInput[]
    updateMany?: EventUpdateManyWithWhereWithoutFeeInput | EventUpdateManyWithWhereWithoutFeeInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutFeeNestedInput = {
    create?: XOR<EventCreateWithoutFeeInput, EventUncheckedCreateWithoutFeeInput> | EventCreateWithoutFeeInput[] | EventUncheckedCreateWithoutFeeInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFeeInput | EventCreateOrConnectWithoutFeeInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutFeeInput | EventUpsertWithWhereUniqueWithoutFeeInput[]
    createMany?: EventCreateManyFeeInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutFeeInput | EventUpdateWithWhereUniqueWithoutFeeInput[]
    updateMany?: EventUpdateManyWithWhereWithoutFeeInput | EventUpdateManyWithWhereWithoutFeeInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type OrganizerCreateNestedOneWithoutEventsInput = {
    create?: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutEventsInput
    connect?: OrganizerWhereUniqueInput
  }

  export type VenueCreateNestedOneWithoutEventInput = {
    create?: XOR<VenueCreateWithoutEventInput, VenueUncheckedCreateWithoutEventInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventInput
    connect?: VenueWhereUniqueInput
  }

  export type FeeCreateNestedOneWithoutEventInput = {
    create?: XOR<FeeCreateWithoutEventInput, FeeUncheckedCreateWithoutEventInput>
    connectOrCreate?: FeeCreateOrConnectWithoutEventInput
    connect?: FeeWhereUniqueInput
  }

  export type EventToCategoryCreateNestedManyWithoutEventInput = {
    create?: XOR<EventToCategoryCreateWithoutEventInput, EventToCategoryUncheckedCreateWithoutEventInput> | EventToCategoryCreateWithoutEventInput[] | EventToCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutEventInput | EventToCategoryCreateOrConnectWithoutEventInput[]
    createMany?: EventToCategoryCreateManyEventInputEnvelope
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
  }

  export type EventDateCreateNestedManyWithoutEventInput = {
    create?: XOR<EventDateCreateWithoutEventInput, EventDateUncheckedCreateWithoutEventInput> | EventDateCreateWithoutEventInput[] | EventDateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDateCreateOrConnectWithoutEventInput | EventDateCreateOrConnectWithoutEventInput[]
    createMany?: EventDateCreateManyEventInputEnvelope
    connect?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
  }

  export type EventSalesPhaseCreateNestedManyWithoutEventInput = {
    create?: XOR<EventSalesPhaseCreateWithoutEventInput, EventSalesPhaseUncheckedCreateWithoutEventInput> | EventSalesPhaseCreateWithoutEventInput[] | EventSalesPhaseUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSalesPhaseCreateOrConnectWithoutEventInput | EventSalesPhaseCreateOrConnectWithoutEventInput[]
    createMany?: EventSalesPhaseCreateManyEventInputEnvelope
    connect?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
  }

  export type VenueUncheckedCreateNestedOneWithoutEventInput = {
    create?: XOR<VenueCreateWithoutEventInput, VenueUncheckedCreateWithoutEventInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventInput
    connect?: VenueWhereUniqueInput
  }

  export type EventToCategoryUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventToCategoryCreateWithoutEventInput, EventToCategoryUncheckedCreateWithoutEventInput> | EventToCategoryCreateWithoutEventInput[] | EventToCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutEventInput | EventToCategoryCreateOrConnectWithoutEventInput[]
    createMany?: EventToCategoryCreateManyEventInputEnvelope
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
  }

  export type EventDateUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventDateCreateWithoutEventInput, EventDateUncheckedCreateWithoutEventInput> | EventDateCreateWithoutEventInput[] | EventDateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDateCreateOrConnectWithoutEventInput | EventDateCreateOrConnectWithoutEventInput[]
    createMany?: EventDateCreateManyEventInputEnvelope
    connect?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
  }

  export type EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventSalesPhaseCreateWithoutEventInput, EventSalesPhaseUncheckedCreateWithoutEventInput> | EventSalesPhaseCreateWithoutEventInput[] | EventSalesPhaseUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSalesPhaseCreateOrConnectWithoutEventInput | EventSalesPhaseCreateOrConnectWithoutEventInput[]
    createMany?: EventSalesPhaseCreateManyEventInputEnvelope
    connect?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
  }

  export type EnumEVENT_STATUSFieldUpdateOperationsInput = {
    set?: $Enums.EVENT_STATUS
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumACCESS_POLICYFieldUpdateOperationsInput = {
    set?: $Enums.ACCESS_POLICY
  }

  export type OrganizerUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutEventsInput
    upsert?: OrganizerUpsertWithoutEventsInput
    connect?: OrganizerWhereUniqueInput
    update?: XOR<XOR<OrganizerUpdateToOneWithWhereWithoutEventsInput, OrganizerUpdateWithoutEventsInput>, OrganizerUncheckedUpdateWithoutEventsInput>
  }

  export type VenueUpdateOneWithoutEventNestedInput = {
    create?: XOR<VenueCreateWithoutEventInput, VenueUncheckedCreateWithoutEventInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventInput
    upsert?: VenueUpsertWithoutEventInput
    disconnect?: VenueWhereInput | boolean
    delete?: VenueWhereInput | boolean
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutEventInput, VenueUpdateWithoutEventInput>, VenueUncheckedUpdateWithoutEventInput>
  }

  export type FeeUpdateOneWithoutEventNestedInput = {
    create?: XOR<FeeCreateWithoutEventInput, FeeUncheckedCreateWithoutEventInput>
    connectOrCreate?: FeeCreateOrConnectWithoutEventInput
    upsert?: FeeUpsertWithoutEventInput
    disconnect?: FeeWhereInput | boolean
    delete?: FeeWhereInput | boolean
    connect?: FeeWhereUniqueInput
    update?: XOR<XOR<FeeUpdateToOneWithWhereWithoutEventInput, FeeUpdateWithoutEventInput>, FeeUncheckedUpdateWithoutEventInput>
  }

  export type EventToCategoryUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventToCategoryCreateWithoutEventInput, EventToCategoryUncheckedCreateWithoutEventInput> | EventToCategoryCreateWithoutEventInput[] | EventToCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutEventInput | EventToCategoryCreateOrConnectWithoutEventInput[]
    upsert?: EventToCategoryUpsertWithWhereUniqueWithoutEventInput | EventToCategoryUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventToCategoryCreateManyEventInputEnvelope
    set?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    disconnect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    delete?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    update?: EventToCategoryUpdateWithWhereUniqueWithoutEventInput | EventToCategoryUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventToCategoryUpdateManyWithWhereWithoutEventInput | EventToCategoryUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventToCategoryScalarWhereInput | EventToCategoryScalarWhereInput[]
  }

  export type EventDateUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventDateCreateWithoutEventInput, EventDateUncheckedCreateWithoutEventInput> | EventDateCreateWithoutEventInput[] | EventDateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDateCreateOrConnectWithoutEventInput | EventDateCreateOrConnectWithoutEventInput[]
    upsert?: EventDateUpsertWithWhereUniqueWithoutEventInput | EventDateUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventDateCreateManyEventInputEnvelope
    set?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    disconnect?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    delete?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    connect?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    update?: EventDateUpdateWithWhereUniqueWithoutEventInput | EventDateUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventDateUpdateManyWithWhereWithoutEventInput | EventDateUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventDateScalarWhereInput | EventDateScalarWhereInput[]
  }

  export type EventSalesPhaseUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventSalesPhaseCreateWithoutEventInput, EventSalesPhaseUncheckedCreateWithoutEventInput> | EventSalesPhaseCreateWithoutEventInput[] | EventSalesPhaseUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSalesPhaseCreateOrConnectWithoutEventInput | EventSalesPhaseCreateOrConnectWithoutEventInput[]
    upsert?: EventSalesPhaseUpsertWithWhereUniqueWithoutEventInput | EventSalesPhaseUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventSalesPhaseCreateManyEventInputEnvelope
    set?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    disconnect?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    delete?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    connect?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    update?: EventSalesPhaseUpdateWithWhereUniqueWithoutEventInput | EventSalesPhaseUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventSalesPhaseUpdateManyWithWhereWithoutEventInput | EventSalesPhaseUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventSalesPhaseScalarWhereInput | EventSalesPhaseScalarWhereInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type VenueUncheckedUpdateOneWithoutEventNestedInput = {
    create?: XOR<VenueCreateWithoutEventInput, VenueUncheckedCreateWithoutEventInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventInput
    upsert?: VenueUpsertWithoutEventInput
    disconnect?: VenueWhereInput | boolean
    delete?: VenueWhereInput | boolean
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutEventInput, VenueUpdateWithoutEventInput>, VenueUncheckedUpdateWithoutEventInput>
  }

  export type EventToCategoryUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventToCategoryCreateWithoutEventInput, EventToCategoryUncheckedCreateWithoutEventInput> | EventToCategoryCreateWithoutEventInput[] | EventToCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventToCategoryCreateOrConnectWithoutEventInput | EventToCategoryCreateOrConnectWithoutEventInput[]
    upsert?: EventToCategoryUpsertWithWhereUniqueWithoutEventInput | EventToCategoryUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventToCategoryCreateManyEventInputEnvelope
    set?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    disconnect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    delete?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    connect?: EventToCategoryWhereUniqueInput | EventToCategoryWhereUniqueInput[]
    update?: EventToCategoryUpdateWithWhereUniqueWithoutEventInput | EventToCategoryUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventToCategoryUpdateManyWithWhereWithoutEventInput | EventToCategoryUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventToCategoryScalarWhereInput | EventToCategoryScalarWhereInput[]
  }

  export type EventDateUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventDateCreateWithoutEventInput, EventDateUncheckedCreateWithoutEventInput> | EventDateCreateWithoutEventInput[] | EventDateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDateCreateOrConnectWithoutEventInput | EventDateCreateOrConnectWithoutEventInput[]
    upsert?: EventDateUpsertWithWhereUniqueWithoutEventInput | EventDateUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventDateCreateManyEventInputEnvelope
    set?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    disconnect?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    delete?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    connect?: EventDateWhereUniqueInput | EventDateWhereUniqueInput[]
    update?: EventDateUpdateWithWhereUniqueWithoutEventInput | EventDateUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventDateUpdateManyWithWhereWithoutEventInput | EventDateUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventDateScalarWhereInput | EventDateScalarWhereInput[]
  }

  export type EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventSalesPhaseCreateWithoutEventInput, EventSalesPhaseUncheckedCreateWithoutEventInput> | EventSalesPhaseCreateWithoutEventInput[] | EventSalesPhaseUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSalesPhaseCreateOrConnectWithoutEventInput | EventSalesPhaseCreateOrConnectWithoutEventInput[]
    upsert?: EventSalesPhaseUpsertWithWhereUniqueWithoutEventInput | EventSalesPhaseUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventSalesPhaseCreateManyEventInputEnvelope
    set?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    disconnect?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    delete?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    connect?: EventSalesPhaseWhereUniqueInput | EventSalesPhaseWhereUniqueInput[]
    update?: EventSalesPhaseUpdateWithWhereUniqueWithoutEventInput | EventSalesPhaseUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventSalesPhaseUpdateManyWithWhereWithoutEventInput | EventSalesPhaseUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventSalesPhaseScalarWhereInput | EventSalesPhaseScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutDatesInput = {
    create?: XOR<EventCreateWithoutDatesInput, EventUncheckedCreateWithoutDatesInput>
    connectOrCreate?: EventCreateOrConnectWithoutDatesInput
    connect?: EventWhereUniqueInput
  }

  export type EventDateZoneCreateNestedManyWithoutEventDateInput = {
    create?: XOR<EventDateZoneCreateWithoutEventDateInput, EventDateZoneUncheckedCreateWithoutEventDateInput> | EventDateZoneCreateWithoutEventDateInput[] | EventDateZoneUncheckedCreateWithoutEventDateInput[]
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutEventDateInput | EventDateZoneCreateOrConnectWithoutEventDateInput[]
    createMany?: EventDateZoneCreateManyEventDateInputEnvelope
    connect?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
  }

  export type EventDateZoneUncheckedCreateNestedManyWithoutEventDateInput = {
    create?: XOR<EventDateZoneCreateWithoutEventDateInput, EventDateZoneUncheckedCreateWithoutEventDateInput> | EventDateZoneCreateWithoutEventDateInput[] | EventDateZoneUncheckedCreateWithoutEventDateInput[]
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutEventDateInput | EventDateZoneCreateOrConnectWithoutEventDateInput[]
    createMany?: EventDateZoneCreateManyEventDateInputEnvelope
    connect?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
  }

  export type EventUpdateOneRequiredWithoutDatesNestedInput = {
    create?: XOR<EventCreateWithoutDatesInput, EventUncheckedCreateWithoutDatesInput>
    connectOrCreate?: EventCreateOrConnectWithoutDatesInput
    upsert?: EventUpsertWithoutDatesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutDatesInput, EventUpdateWithoutDatesInput>, EventUncheckedUpdateWithoutDatesInput>
  }

  export type EventDateZoneUpdateManyWithoutEventDateNestedInput = {
    create?: XOR<EventDateZoneCreateWithoutEventDateInput, EventDateZoneUncheckedCreateWithoutEventDateInput> | EventDateZoneCreateWithoutEventDateInput[] | EventDateZoneUncheckedCreateWithoutEventDateInput[]
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutEventDateInput | EventDateZoneCreateOrConnectWithoutEventDateInput[]
    upsert?: EventDateZoneUpsertWithWhereUniqueWithoutEventDateInput | EventDateZoneUpsertWithWhereUniqueWithoutEventDateInput[]
    createMany?: EventDateZoneCreateManyEventDateInputEnvelope
    set?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    disconnect?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    delete?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    connect?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    update?: EventDateZoneUpdateWithWhereUniqueWithoutEventDateInput | EventDateZoneUpdateWithWhereUniqueWithoutEventDateInput[]
    updateMany?: EventDateZoneUpdateManyWithWhereWithoutEventDateInput | EventDateZoneUpdateManyWithWhereWithoutEventDateInput[]
    deleteMany?: EventDateZoneScalarWhereInput | EventDateZoneScalarWhereInput[]
  }

  export type EventDateZoneUncheckedUpdateManyWithoutEventDateNestedInput = {
    create?: XOR<EventDateZoneCreateWithoutEventDateInput, EventDateZoneUncheckedCreateWithoutEventDateInput> | EventDateZoneCreateWithoutEventDateInput[] | EventDateZoneUncheckedCreateWithoutEventDateInput[]
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutEventDateInput | EventDateZoneCreateOrConnectWithoutEventDateInput[]
    upsert?: EventDateZoneUpsertWithWhereUniqueWithoutEventDateInput | EventDateZoneUpsertWithWhereUniqueWithoutEventDateInput[]
    createMany?: EventDateZoneCreateManyEventDateInputEnvelope
    set?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    disconnect?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    delete?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    connect?: EventDateZoneWhereUniqueInput | EventDateZoneWhereUniqueInput[]
    update?: EventDateZoneUpdateWithWhereUniqueWithoutEventDateInput | EventDateZoneUpdateWithWhereUniqueWithoutEventDateInput[]
    updateMany?: EventDateZoneUpdateManyWithWhereWithoutEventDateInput | EventDateZoneUpdateManyWithWhereWithoutEventDateInput[]
    deleteMany?: EventDateZoneScalarWhereInput | EventDateZoneScalarWhereInput[]
  }

  export type EventDateCreateNestedOneWithoutZoneDatesInput = {
    create?: XOR<EventDateCreateWithoutZoneDatesInput, EventDateUncheckedCreateWithoutZoneDatesInput>
    connectOrCreate?: EventDateCreateOrConnectWithoutZoneDatesInput
    connect?: EventDateWhereUniqueInput
  }

  export type SeatMapCreateNestedOneWithoutEventDateZoneInput = {
    create?: XOR<SeatMapCreateWithoutEventDateZoneInput, SeatMapUncheckedCreateWithoutEventDateZoneInput>
    connectOrCreate?: SeatMapCreateOrConnectWithoutEventDateZoneInput
    connect?: SeatMapWhereUniqueInput
  }

  export type EventDateZoneAllocationCreateNestedManyWithoutZoneInput = {
    create?: XOR<EventDateZoneAllocationCreateWithoutZoneInput, EventDateZoneAllocationUncheckedCreateWithoutZoneInput> | EventDateZoneAllocationCreateWithoutZoneInput[] | EventDateZoneAllocationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: EventDateZoneAllocationCreateOrConnectWithoutZoneInput | EventDateZoneAllocationCreateOrConnectWithoutZoneInput[]
    createMany?: EventDateZoneAllocationCreateManyZoneInputEnvelope
    connect?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
  }

  export type EventDateZoneAllocationUncheckedCreateNestedManyWithoutZoneInput = {
    create?: XOR<EventDateZoneAllocationCreateWithoutZoneInput, EventDateZoneAllocationUncheckedCreateWithoutZoneInput> | EventDateZoneAllocationCreateWithoutZoneInput[] | EventDateZoneAllocationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: EventDateZoneAllocationCreateOrConnectWithoutZoneInput | EventDateZoneAllocationCreateOrConnectWithoutZoneInput[]
    createMany?: EventDateZoneAllocationCreateManyZoneInputEnvelope
    connect?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
  }

  export type EnumZONE_KINDFieldUpdateOperationsInput = {
    set?: $Enums.ZONE_KIND
  }

  export type EnumCURRENCYFieldUpdateOperationsInput = {
    set?: $Enums.CURRENCY
  }

  export type EventDateUpdateOneRequiredWithoutZoneDatesNestedInput = {
    create?: XOR<EventDateCreateWithoutZoneDatesInput, EventDateUncheckedCreateWithoutZoneDatesInput>
    connectOrCreate?: EventDateCreateOrConnectWithoutZoneDatesInput
    upsert?: EventDateUpsertWithoutZoneDatesInput
    connect?: EventDateWhereUniqueInput
    update?: XOR<XOR<EventDateUpdateToOneWithWhereWithoutZoneDatesInput, EventDateUpdateWithoutZoneDatesInput>, EventDateUncheckedUpdateWithoutZoneDatesInput>
  }

  export type SeatMapUpdateOneWithoutEventDateZoneNestedInput = {
    create?: XOR<SeatMapCreateWithoutEventDateZoneInput, SeatMapUncheckedCreateWithoutEventDateZoneInput>
    connectOrCreate?: SeatMapCreateOrConnectWithoutEventDateZoneInput
    upsert?: SeatMapUpsertWithoutEventDateZoneInput
    disconnect?: SeatMapWhereInput | boolean
    delete?: SeatMapWhereInput | boolean
    connect?: SeatMapWhereUniqueInput
    update?: XOR<XOR<SeatMapUpdateToOneWithWhereWithoutEventDateZoneInput, SeatMapUpdateWithoutEventDateZoneInput>, SeatMapUncheckedUpdateWithoutEventDateZoneInput>
  }

  export type EventDateZoneAllocationUpdateManyWithoutZoneNestedInput = {
    create?: XOR<EventDateZoneAllocationCreateWithoutZoneInput, EventDateZoneAllocationUncheckedCreateWithoutZoneInput> | EventDateZoneAllocationCreateWithoutZoneInput[] | EventDateZoneAllocationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: EventDateZoneAllocationCreateOrConnectWithoutZoneInput | EventDateZoneAllocationCreateOrConnectWithoutZoneInput[]
    upsert?: EventDateZoneAllocationUpsertWithWhereUniqueWithoutZoneInput | EventDateZoneAllocationUpsertWithWhereUniqueWithoutZoneInput[]
    createMany?: EventDateZoneAllocationCreateManyZoneInputEnvelope
    set?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    disconnect?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    delete?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    connect?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    update?: EventDateZoneAllocationUpdateWithWhereUniqueWithoutZoneInput | EventDateZoneAllocationUpdateWithWhereUniqueWithoutZoneInput[]
    updateMany?: EventDateZoneAllocationUpdateManyWithWhereWithoutZoneInput | EventDateZoneAllocationUpdateManyWithWhereWithoutZoneInput[]
    deleteMany?: EventDateZoneAllocationScalarWhereInput | EventDateZoneAllocationScalarWhereInput[]
  }

  export type EventDateZoneAllocationUncheckedUpdateManyWithoutZoneNestedInput = {
    create?: XOR<EventDateZoneAllocationCreateWithoutZoneInput, EventDateZoneAllocationUncheckedCreateWithoutZoneInput> | EventDateZoneAllocationCreateWithoutZoneInput[] | EventDateZoneAllocationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: EventDateZoneAllocationCreateOrConnectWithoutZoneInput | EventDateZoneAllocationCreateOrConnectWithoutZoneInput[]
    upsert?: EventDateZoneAllocationUpsertWithWhereUniqueWithoutZoneInput | EventDateZoneAllocationUpsertWithWhereUniqueWithoutZoneInput[]
    createMany?: EventDateZoneAllocationCreateManyZoneInputEnvelope
    set?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    disconnect?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    delete?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    connect?: EventDateZoneAllocationWhereUniqueInput | EventDateZoneAllocationWhereUniqueInput[]
    update?: EventDateZoneAllocationUpdateWithWhereUniqueWithoutZoneInput | EventDateZoneAllocationUpdateWithWhereUniqueWithoutZoneInput[]
    updateMany?: EventDateZoneAllocationUpdateManyWithWhereWithoutZoneInput | EventDateZoneAllocationUpdateManyWithWhereWithoutZoneInput[]
    deleteMany?: EventDateZoneAllocationScalarWhereInput | EventDateZoneAllocationScalarWhereInput[]
  }

  export type SeatCreateNestedManyWithoutSeatMapInput = {
    create?: XOR<SeatCreateWithoutSeatMapInput, SeatUncheckedCreateWithoutSeatMapInput> | SeatCreateWithoutSeatMapInput[] | SeatUncheckedCreateWithoutSeatMapInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutSeatMapInput | SeatCreateOrConnectWithoutSeatMapInput[]
    createMany?: SeatCreateManySeatMapInputEnvelope
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
  }

  export type EventDateZoneCreateNestedOneWithoutSeatMapInput = {
    create?: XOR<EventDateZoneCreateWithoutSeatMapInput, EventDateZoneUncheckedCreateWithoutSeatMapInput>
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutSeatMapInput
    connect?: EventDateZoneWhereUniqueInput
  }

  export type SeatUncheckedCreateNestedManyWithoutSeatMapInput = {
    create?: XOR<SeatCreateWithoutSeatMapInput, SeatUncheckedCreateWithoutSeatMapInput> | SeatCreateWithoutSeatMapInput[] | SeatUncheckedCreateWithoutSeatMapInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutSeatMapInput | SeatCreateOrConnectWithoutSeatMapInput[]
    createMany?: SeatCreateManySeatMapInputEnvelope
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
  }

  export type EventDateZoneUncheckedCreateNestedOneWithoutSeatMapInput = {
    create?: XOR<EventDateZoneCreateWithoutSeatMapInput, EventDateZoneUncheckedCreateWithoutSeatMapInput>
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutSeatMapInput
    connect?: EventDateZoneWhereUniqueInput
  }

  export type SeatUpdateManyWithoutSeatMapNestedInput = {
    create?: XOR<SeatCreateWithoutSeatMapInput, SeatUncheckedCreateWithoutSeatMapInput> | SeatCreateWithoutSeatMapInput[] | SeatUncheckedCreateWithoutSeatMapInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutSeatMapInput | SeatCreateOrConnectWithoutSeatMapInput[]
    upsert?: SeatUpsertWithWhereUniqueWithoutSeatMapInput | SeatUpsertWithWhereUniqueWithoutSeatMapInput[]
    createMany?: SeatCreateManySeatMapInputEnvelope
    set?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    disconnect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    delete?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    update?: SeatUpdateWithWhereUniqueWithoutSeatMapInput | SeatUpdateWithWhereUniqueWithoutSeatMapInput[]
    updateMany?: SeatUpdateManyWithWhereWithoutSeatMapInput | SeatUpdateManyWithWhereWithoutSeatMapInput[]
    deleteMany?: SeatScalarWhereInput | SeatScalarWhereInput[]
  }

  export type EventDateZoneUpdateOneWithoutSeatMapNestedInput = {
    create?: XOR<EventDateZoneCreateWithoutSeatMapInput, EventDateZoneUncheckedCreateWithoutSeatMapInput>
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutSeatMapInput
    upsert?: EventDateZoneUpsertWithoutSeatMapInput
    disconnect?: EventDateZoneWhereInput | boolean
    delete?: EventDateZoneWhereInput | boolean
    connect?: EventDateZoneWhereUniqueInput
    update?: XOR<XOR<EventDateZoneUpdateToOneWithWhereWithoutSeatMapInput, EventDateZoneUpdateWithoutSeatMapInput>, EventDateZoneUncheckedUpdateWithoutSeatMapInput>
  }

  export type SeatUncheckedUpdateManyWithoutSeatMapNestedInput = {
    create?: XOR<SeatCreateWithoutSeatMapInput, SeatUncheckedCreateWithoutSeatMapInput> | SeatCreateWithoutSeatMapInput[] | SeatUncheckedCreateWithoutSeatMapInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutSeatMapInput | SeatCreateOrConnectWithoutSeatMapInput[]
    upsert?: SeatUpsertWithWhereUniqueWithoutSeatMapInput | SeatUpsertWithWhereUniqueWithoutSeatMapInput[]
    createMany?: SeatCreateManySeatMapInputEnvelope
    set?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    disconnect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    delete?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    update?: SeatUpdateWithWhereUniqueWithoutSeatMapInput | SeatUpdateWithWhereUniqueWithoutSeatMapInput[]
    updateMany?: SeatUpdateManyWithWhereWithoutSeatMapInput | SeatUpdateManyWithWhereWithoutSeatMapInput[]
    deleteMany?: SeatScalarWhereInput | SeatScalarWhereInput[]
  }

  export type EventDateZoneUncheckedUpdateOneWithoutSeatMapNestedInput = {
    create?: XOR<EventDateZoneCreateWithoutSeatMapInput, EventDateZoneUncheckedCreateWithoutSeatMapInput>
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutSeatMapInput
    upsert?: EventDateZoneUpsertWithoutSeatMapInput
    disconnect?: EventDateZoneWhereInput | boolean
    delete?: EventDateZoneWhereInput | boolean
    connect?: EventDateZoneWhereUniqueInput
    update?: XOR<XOR<EventDateZoneUpdateToOneWithWhereWithoutSeatMapInput, EventDateZoneUpdateWithoutSeatMapInput>, EventDateZoneUncheckedUpdateWithoutSeatMapInput>
  }

  export type SeatMapCreateNestedOneWithoutOccupiedSeatsInput = {
    create?: XOR<SeatMapCreateWithoutOccupiedSeatsInput, SeatMapUncheckedCreateWithoutOccupiedSeatsInput>
    connectOrCreate?: SeatMapCreateOrConnectWithoutOccupiedSeatsInput
    connect?: SeatMapWhereUniqueInput
  }

  export type SeatMapUpdateOneRequiredWithoutOccupiedSeatsNestedInput = {
    create?: XOR<SeatMapCreateWithoutOccupiedSeatsInput, SeatMapUncheckedCreateWithoutOccupiedSeatsInput>
    connectOrCreate?: SeatMapCreateOrConnectWithoutOccupiedSeatsInput
    upsert?: SeatMapUpsertWithoutOccupiedSeatsInput
    connect?: SeatMapWhereUniqueInput
    update?: XOR<XOR<SeatMapUpdateToOneWithWhereWithoutOccupiedSeatsInput, SeatMapUpdateWithoutOccupiedSeatsInput>, SeatMapUncheckedUpdateWithoutOccupiedSeatsInput>
  }

  export type EventDateZoneCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<EventDateZoneCreateWithoutAllocationsInput, EventDateZoneUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutAllocationsInput
    connect?: EventDateZoneWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventDateZoneUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<EventDateZoneCreateWithoutAllocationsInput, EventDateZoneUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: EventDateZoneCreateOrConnectWithoutAllocationsInput
    upsert?: EventDateZoneUpsertWithoutAllocationsInput
    connect?: EventDateZoneWhereUniqueInput
    update?: XOR<XOR<EventDateZoneUpdateToOneWithWhereWithoutAllocationsInput, EventDateZoneUpdateWithoutAllocationsInput>, EventDateZoneUncheckedUpdateWithoutAllocationsInput>
  }

  export type EventCreateNestedOneWithoutSalesPhasesInput = {
    create?: XOR<EventCreateWithoutSalesPhasesInput, EventUncheckedCreateWithoutSalesPhasesInput>
    connectOrCreate?: EventCreateOrConnectWithoutSalesPhasesInput
    connect?: EventWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutSalesPhasesNestedInput = {
    create?: XOR<EventCreateWithoutSalesPhasesInput, EventUncheckedCreateWithoutSalesPhasesInput>
    connectOrCreate?: EventCreateOrConnectWithoutSalesPhasesInput
    upsert?: EventUpsertWithoutSalesPhasesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutSalesPhasesInput, EventUpdateWithoutSalesPhasesInput>, EventUncheckedUpdateWithoutSalesPhasesInput>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumEVENT_STATUSFilter<$PrismaModel = never> = {
    equals?: $Enums.EVENT_STATUS | EnumEVENT_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumEVENT_STATUSFilter<$PrismaModel> | $Enums.EVENT_STATUS
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumACCESS_POLICYFilter<$PrismaModel = never> = {
    equals?: $Enums.ACCESS_POLICY | EnumACCESS_POLICYFieldRefInput<$PrismaModel>
    in?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    not?: NestedEnumACCESS_POLICYFilter<$PrismaModel> | $Enums.ACCESS_POLICY
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEVENT_STATUSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EVENT_STATUS | EnumEVENT_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.EVENT_STATUS[] | ListEnumEVENT_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumEVENT_STATUSWithAggregatesFilter<$PrismaModel> | $Enums.EVENT_STATUS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEVENT_STATUSFilter<$PrismaModel>
    _max?: NestedEnumEVENT_STATUSFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumACCESS_POLICYWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ACCESS_POLICY | EnumACCESS_POLICYFieldRefInput<$PrismaModel>
    in?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACCESS_POLICY[] | ListEnumACCESS_POLICYFieldRefInput<$PrismaModel>
    not?: NestedEnumACCESS_POLICYWithAggregatesFilter<$PrismaModel> | $Enums.ACCESS_POLICY
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumACCESS_POLICYFilter<$PrismaModel>
    _max?: NestedEnumACCESS_POLICYFilter<$PrismaModel>
  }

  export type NestedEnumZONE_KINDFilter<$PrismaModel = never> = {
    equals?: $Enums.ZONE_KIND | EnumZONE_KINDFieldRefInput<$PrismaModel>
    in?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    not?: NestedEnumZONE_KINDFilter<$PrismaModel> | $Enums.ZONE_KIND
  }

  export type NestedEnumCURRENCYFilter<$PrismaModel = never> = {
    equals?: $Enums.CURRENCY | EnumCURRENCYFieldRefInput<$PrismaModel>
    in?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    notIn?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    not?: NestedEnumCURRENCYFilter<$PrismaModel> | $Enums.CURRENCY
  }

  export type NestedEnumZONE_KINDWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ZONE_KIND | EnumZONE_KINDFieldRefInput<$PrismaModel>
    in?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZONE_KIND[] | ListEnumZONE_KINDFieldRefInput<$PrismaModel>
    not?: NestedEnumZONE_KINDWithAggregatesFilter<$PrismaModel> | $Enums.ZONE_KIND
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumZONE_KINDFilter<$PrismaModel>
    _max?: NestedEnumZONE_KINDFilter<$PrismaModel>
  }

  export type NestedEnumCURRENCYWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CURRENCY | EnumCURRENCYFieldRefInput<$PrismaModel>
    in?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    notIn?: $Enums.CURRENCY[] | ListEnumCURRENCYFieldRefInput<$PrismaModel>
    not?: NestedEnumCURRENCYWithAggregatesFilter<$PrismaModel> | $Enums.CURRENCY
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCURRENCYFilter<$PrismaModel>
    _max?: NestedEnumCURRENCYFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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
    events?: EventCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateWithoutUserInput = {
    organizerId?: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
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
    events?: EventUpdateManyWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateWithoutUserInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
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

  export type EventCreateWithoutOrganizerInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueCreateNestedOneWithoutEventInput
    fee?: FeeCreateNestedOneWithoutEventInput
    categories?: EventToCategoryCreateNestedManyWithoutEventInput
    dates?: EventDateCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOrganizerInput = {
    eventId?: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueUncheckedCreateNestedOneWithoutEventInput
    categories?: EventToCategoryUncheckedCreateNestedManyWithoutEventInput
    dates?: EventDateUncheckedCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventCreateManyOrganizerInputEnvelope = {
    data: EventCreateManyOrganizerInput | EventCreateManyOrganizerInput[]
    skipDuplicates?: boolean
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

  export type EventUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
  }

  export type EventUpdateManyWithWhereWithoutOrganizerInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    eventId?: BigIntFilter<"Event"> | bigint | number
    organizerId?: BigIntFilter<"Event"> | bigint | number
    feeId?: BigIntNullableFilter<"Event"> | bigint | number | null
    title?: StringFilter<"Event"> | string
    status?: EnumEVENT_STATUSFilter<"Event"> | $Enums.EVENT_STATUS
    inPerson?: BoolFilter<"Event"> | boolean
    description?: StringFilter<"Event"> | string
    accessPolicy?: EnumACCESS_POLICYFilter<"Event"> | $Enums.ACCESS_POLICY
    accessPolicyDescription?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type EventToCategoryCreateWithoutCategoryInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutCategoriesInput
  }

  export type EventToCategoryUncheckedCreateWithoutCategoryInput = {
    eventId: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventToCategoryCreateOrConnectWithoutCategoryInput = {
    where: EventToCategoryWhereUniqueInput
    create: XOR<EventToCategoryCreateWithoutCategoryInput, EventToCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type EventToCategoryCreateManyCategoryInputEnvelope = {
    data: EventToCategoryCreateManyCategoryInput | EventToCategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type EventToCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: EventToCategoryWhereUniqueInput
    update: XOR<EventToCategoryUpdateWithoutCategoryInput, EventToCategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<EventToCategoryCreateWithoutCategoryInput, EventToCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type EventToCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: EventToCategoryWhereUniqueInput
    data: XOR<EventToCategoryUpdateWithoutCategoryInput, EventToCategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type EventToCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: EventToCategoryScalarWhereInput
    data: XOR<EventToCategoryUpdateManyMutationInput, EventToCategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type EventToCategoryScalarWhereInput = {
    AND?: EventToCategoryScalarWhereInput | EventToCategoryScalarWhereInput[]
    OR?: EventToCategoryScalarWhereInput[]
    NOT?: EventToCategoryScalarWhereInput | EventToCategoryScalarWhereInput[]
    eventId?: BigIntFilter<"EventToCategory"> | bigint | number
    eventCategoryId?: BigIntFilter<"EventToCategory"> | bigint | number
    createdAt?: DateTimeFilter<"EventToCategory"> | Date | string
    updatedAt?: DateTimeFilter<"EventToCategory"> | Date | string
  }

  export type EventCreateWithoutCategoriesInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventInput
    fee?: FeeCreateNestedOneWithoutEventInput
    dates?: EventDateCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutCategoriesInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueUncheckedCreateNestedOneWithoutEventInput
    dates?: EventDateUncheckedCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutCategoriesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutCategoriesInput, EventUncheckedCreateWithoutCategoriesInput>
  }

  export type EventCategoryCreateWithoutEventsInput = {
    eventCategoryId?: bigint | number
    initials: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCategoryUncheckedCreateWithoutEventsInput = {
    eventCategoryId?: bigint | number
    initials: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCategoryCreateOrConnectWithoutEventsInput = {
    where: EventCategoryWhereUniqueInput
    create: XOR<EventCategoryCreateWithoutEventsInput, EventCategoryUncheckedCreateWithoutEventsInput>
  }

  export type EventUpsertWithoutCategoriesInput = {
    update: XOR<EventUpdateWithoutCategoriesInput, EventUncheckedUpdateWithoutCategoriesInput>
    create: XOR<EventCreateWithoutCategoriesInput, EventUncheckedCreateWithoutCategoriesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutCategoriesInput, EventUncheckedUpdateWithoutCategoriesInput>
  }

  export type EventUpdateWithoutCategoriesInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventNestedInput
    fee?: FeeUpdateOneWithoutEventNestedInput
    dates?: EventDateUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutCategoriesInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUncheckedUpdateOneWithoutEventNestedInput
    dates?: EventDateUncheckedUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCategoryUpsertWithoutEventsInput = {
    update: XOR<EventCategoryUpdateWithoutEventsInput, EventCategoryUncheckedUpdateWithoutEventsInput>
    create: XOR<EventCategoryCreateWithoutEventsInput, EventCategoryUncheckedCreateWithoutEventsInput>
    where?: EventCategoryWhereInput
  }

  export type EventCategoryUpdateToOneWithWhereWithoutEventsInput = {
    where?: EventCategoryWhereInput
    data: XOR<EventCategoryUpdateWithoutEventsInput, EventCategoryUncheckedUpdateWithoutEventsInput>
  }

  export type EventCategoryUpdateWithoutEventsInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    initials?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCategoryUncheckedUpdateWithoutEventsInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    initials?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateWithoutVenueInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutEventsInput
    fee?: FeeCreateNestedOneWithoutEventInput
    categories?: EventToCategoryCreateNestedManyWithoutEventInput
    dates?: EventDateCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutVenueInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: EventToCategoryUncheckedCreateNestedManyWithoutEventInput
    dates?: EventDateUncheckedCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutVenueInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
  }

  export type EventUpsertWithoutVenueInput = {
    update: XOR<EventUpdateWithoutVenueInput, EventUncheckedUpdateWithoutVenueInput>
    create: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutVenueInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutVenueInput, EventUncheckedUpdateWithoutVenueInput>
  }

  export type EventUpdateWithoutVenueInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutEventsNestedInput
    fee?: FeeUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUpdateManyWithoutEventNestedInput
    dates?: EventDateUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutVenueInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: EventToCategoryUncheckedUpdateManyWithoutEventNestedInput
    dates?: EventDateUncheckedUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateWithoutFeeInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventInput
    categories?: EventToCategoryCreateNestedManyWithoutEventInput
    dates?: EventDateCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutFeeInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueUncheckedCreateNestedOneWithoutEventInput
    categories?: EventToCategoryUncheckedCreateNestedManyWithoutEventInput
    dates?: EventDateUncheckedCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutFeeInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutFeeInput, EventUncheckedCreateWithoutFeeInput>
  }

  export type EventCreateManyFeeInputEnvelope = {
    data: EventCreateManyFeeInput | EventCreateManyFeeInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithWhereUniqueWithoutFeeInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutFeeInput, EventUncheckedUpdateWithoutFeeInput>
    create: XOR<EventCreateWithoutFeeInput, EventUncheckedCreateWithoutFeeInput>
  }

  export type EventUpdateWithWhereUniqueWithoutFeeInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutFeeInput, EventUncheckedUpdateWithoutFeeInput>
  }

  export type EventUpdateManyWithWhereWithoutFeeInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutFeeInput>
  }

  export type OrganizerCreateWithoutEventsInput = {
    organizerId?: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
    user: UserCreateNestedOneWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateWithoutEventsInput = {
    organizerId?: bigint | number
    userId: bigint | number
    companyName: string
    idType: $Enums.ID_TYPE
    idNumber: string
  }

  export type OrganizerCreateOrConnectWithoutEventsInput = {
    where: OrganizerWhereUniqueInput
    create: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
  }

  export type VenueCreateWithoutEventInput = {
    venueId?: bigint | number
    city?: string | null
    address?: string | null
    addressUrl?: string | null
    reference?: string | null
    capacity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUncheckedCreateWithoutEventInput = {
    venueId?: bigint | number
    city?: string | null
    address?: string | null
    addressUrl?: string | null
    reference?: string | null
    capacity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueCreateOrConnectWithoutEventInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutEventInput, VenueUncheckedCreateWithoutEventInput>
  }

  export type FeeCreateWithoutEventInput = {
    feeId?: bigint | number
    percentage: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeeUncheckedCreateWithoutEventInput = {
    feeId?: bigint | number
    percentage: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeeCreateOrConnectWithoutEventInput = {
    where: FeeWhereUniqueInput
    create: XOR<FeeCreateWithoutEventInput, FeeUncheckedCreateWithoutEventInput>
  }

  export type EventToCategoryCreateWithoutEventInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    category: EventCategoryCreateNestedOneWithoutEventsInput
  }

  export type EventToCategoryUncheckedCreateWithoutEventInput = {
    eventCategoryId: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventToCategoryCreateOrConnectWithoutEventInput = {
    where: EventToCategoryWhereUniqueInput
    create: XOR<EventToCategoryCreateWithoutEventInput, EventToCategoryUncheckedCreateWithoutEventInput>
  }

  export type EventToCategoryCreateManyEventInputEnvelope = {
    data: EventToCategoryCreateManyEventInput | EventToCategoryCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventDateCreateWithoutEventInput = {
    eventDateId?: bigint | number
    startAt: Date | string
    endAt: Date | string
    zoneDates?: EventDateZoneCreateNestedManyWithoutEventDateInput
  }

  export type EventDateUncheckedCreateWithoutEventInput = {
    eventDateId?: bigint | number
    startAt: Date | string
    endAt: Date | string
    zoneDates?: EventDateZoneUncheckedCreateNestedManyWithoutEventDateInput
  }

  export type EventDateCreateOrConnectWithoutEventInput = {
    where: EventDateWhereUniqueInput
    create: XOR<EventDateCreateWithoutEventInput, EventDateUncheckedCreateWithoutEventInput>
  }

  export type EventDateCreateManyEventInputEnvelope = {
    data: EventDateCreateManyEventInput | EventDateCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventSalesPhaseCreateWithoutEventInput = {
    eventSalesPhaseId?: bigint | number
    name: string
    startAt?: Date | string | null
    endAt?: Date | string | null
    percentage: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventSalesPhaseUncheckedCreateWithoutEventInput = {
    eventSalesPhaseId?: bigint | number
    name: string
    startAt?: Date | string | null
    endAt?: Date | string | null
    percentage: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventSalesPhaseCreateOrConnectWithoutEventInput = {
    where: EventSalesPhaseWhereUniqueInput
    create: XOR<EventSalesPhaseCreateWithoutEventInput, EventSalesPhaseUncheckedCreateWithoutEventInput>
  }

  export type EventSalesPhaseCreateManyEventInputEnvelope = {
    data: EventSalesPhaseCreateManyEventInput | EventSalesPhaseCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type OrganizerUpsertWithoutEventsInput = {
    update: XOR<OrganizerUpdateWithoutEventsInput, OrganizerUncheckedUpdateWithoutEventsInput>
    create: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
    where?: OrganizerWhereInput
  }

  export type OrganizerUpdateToOneWithWhereWithoutEventsInput = {
    where?: OrganizerWhereInput
    data: XOR<OrganizerUpdateWithoutEventsInput, OrganizerUncheckedUpdateWithoutEventsInput>
  }

  export type OrganizerUpdateWithoutEventsInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateWithoutEventsInput = {
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    idType?: EnumID_TYPEFieldUpdateOperationsInput | $Enums.ID_TYPE
    idNumber?: StringFieldUpdateOperationsInput | string
  }

  export type VenueUpsertWithoutEventInput = {
    update: XOR<VenueUpdateWithoutEventInput, VenueUncheckedUpdateWithoutEventInput>
    create: XOR<VenueCreateWithoutEventInput, VenueUncheckedCreateWithoutEventInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutEventInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutEventInput, VenueUncheckedUpdateWithoutEventInput>
  }

  export type VenueUpdateWithoutEventInput = {
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateWithoutEventInput = {
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeUpsertWithoutEventInput = {
    update: XOR<FeeUpdateWithoutEventInput, FeeUncheckedUpdateWithoutEventInput>
    create: XOR<FeeCreateWithoutEventInput, FeeUncheckedCreateWithoutEventInput>
    where?: FeeWhereInput
  }

  export type FeeUpdateToOneWithWhereWithoutEventInput = {
    where?: FeeWhereInput
    data: XOR<FeeUpdateWithoutEventInput, FeeUncheckedUpdateWithoutEventInput>
  }

  export type FeeUpdateWithoutEventInput = {
    feeId?: BigIntFieldUpdateOperationsInput | bigint | number
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeUncheckedUpdateWithoutEventInput = {
    feeId?: BigIntFieldUpdateOperationsInput | bigint | number
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryUpsertWithWhereUniqueWithoutEventInput = {
    where: EventToCategoryWhereUniqueInput
    update: XOR<EventToCategoryUpdateWithoutEventInput, EventToCategoryUncheckedUpdateWithoutEventInput>
    create: XOR<EventToCategoryCreateWithoutEventInput, EventToCategoryUncheckedCreateWithoutEventInput>
  }

  export type EventToCategoryUpdateWithWhereUniqueWithoutEventInput = {
    where: EventToCategoryWhereUniqueInput
    data: XOR<EventToCategoryUpdateWithoutEventInput, EventToCategoryUncheckedUpdateWithoutEventInput>
  }

  export type EventToCategoryUpdateManyWithWhereWithoutEventInput = {
    where: EventToCategoryScalarWhereInput
    data: XOR<EventToCategoryUpdateManyMutationInput, EventToCategoryUncheckedUpdateManyWithoutEventInput>
  }

  export type EventDateUpsertWithWhereUniqueWithoutEventInput = {
    where: EventDateWhereUniqueInput
    update: XOR<EventDateUpdateWithoutEventInput, EventDateUncheckedUpdateWithoutEventInput>
    create: XOR<EventDateCreateWithoutEventInput, EventDateUncheckedCreateWithoutEventInput>
  }

  export type EventDateUpdateWithWhereUniqueWithoutEventInput = {
    where: EventDateWhereUniqueInput
    data: XOR<EventDateUpdateWithoutEventInput, EventDateUncheckedUpdateWithoutEventInput>
  }

  export type EventDateUpdateManyWithWhereWithoutEventInput = {
    where: EventDateScalarWhereInput
    data: XOR<EventDateUpdateManyMutationInput, EventDateUncheckedUpdateManyWithoutEventInput>
  }

  export type EventDateScalarWhereInput = {
    AND?: EventDateScalarWhereInput | EventDateScalarWhereInput[]
    OR?: EventDateScalarWhereInput[]
    NOT?: EventDateScalarWhereInput | EventDateScalarWhereInput[]
    eventDateId?: BigIntFilter<"EventDate"> | bigint | number
    eventId?: BigIntFilter<"EventDate"> | bigint | number
    startAt?: DateTimeFilter<"EventDate"> | Date | string
    endAt?: DateTimeFilter<"EventDate"> | Date | string
  }

  export type EventSalesPhaseUpsertWithWhereUniqueWithoutEventInput = {
    where: EventSalesPhaseWhereUniqueInput
    update: XOR<EventSalesPhaseUpdateWithoutEventInput, EventSalesPhaseUncheckedUpdateWithoutEventInput>
    create: XOR<EventSalesPhaseCreateWithoutEventInput, EventSalesPhaseUncheckedCreateWithoutEventInput>
  }

  export type EventSalesPhaseUpdateWithWhereUniqueWithoutEventInput = {
    where: EventSalesPhaseWhereUniqueInput
    data: XOR<EventSalesPhaseUpdateWithoutEventInput, EventSalesPhaseUncheckedUpdateWithoutEventInput>
  }

  export type EventSalesPhaseUpdateManyWithWhereWithoutEventInput = {
    where: EventSalesPhaseScalarWhereInput
    data: XOR<EventSalesPhaseUpdateManyMutationInput, EventSalesPhaseUncheckedUpdateManyWithoutEventInput>
  }

  export type EventSalesPhaseScalarWhereInput = {
    AND?: EventSalesPhaseScalarWhereInput | EventSalesPhaseScalarWhereInput[]
    OR?: EventSalesPhaseScalarWhereInput[]
    NOT?: EventSalesPhaseScalarWhereInput | EventSalesPhaseScalarWhereInput[]
    eventSalesPhaseId?: BigIntFilter<"EventSalesPhase"> | bigint | number
    eventId?: BigIntFilter<"EventSalesPhase"> | bigint | number
    name?: StringFilter<"EventSalesPhase"> | string
    startAt?: DateTimeNullableFilter<"EventSalesPhase"> | Date | string | null
    endAt?: DateTimeNullableFilter<"EventSalesPhase"> | Date | string | null
    percentage?: DecimalFilter<"EventSalesPhase"> | Decimal | DecimalJsLike | number | string
    active?: BoolFilter<"EventSalesPhase"> | boolean
    createdAt?: DateTimeFilter<"EventSalesPhase"> | Date | string
    updatedAt?: DateTimeFilter<"EventSalesPhase"> | Date | string
  }

  export type EventCreateWithoutDatesInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventInput
    fee?: FeeCreateNestedOneWithoutEventInput
    categories?: EventToCategoryCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutDatesInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueUncheckedCreateNestedOneWithoutEventInput
    categories?: EventToCategoryUncheckedCreateNestedManyWithoutEventInput
    salesPhases?: EventSalesPhaseUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutDatesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutDatesInput, EventUncheckedCreateWithoutDatesInput>
  }

  export type EventDateZoneCreateWithoutEventDateInput = {
    eventDateZoneId?: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    seatMap?: SeatMapCreateNestedOneWithoutEventDateZoneInput
    allocations?: EventDateZoneAllocationCreateNestedManyWithoutZoneInput
  }

  export type EventDateZoneUncheckedCreateWithoutEventDateInput = {
    eventDateZoneId?: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    seatMapId?: bigint | number | null
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    allocations?: EventDateZoneAllocationUncheckedCreateNestedManyWithoutZoneInput
  }

  export type EventDateZoneCreateOrConnectWithoutEventDateInput = {
    where: EventDateZoneWhereUniqueInput
    create: XOR<EventDateZoneCreateWithoutEventDateInput, EventDateZoneUncheckedCreateWithoutEventDateInput>
  }

  export type EventDateZoneCreateManyEventDateInputEnvelope = {
    data: EventDateZoneCreateManyEventDateInput | EventDateZoneCreateManyEventDateInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithoutDatesInput = {
    update: XOR<EventUpdateWithoutDatesInput, EventUncheckedUpdateWithoutDatesInput>
    create: XOR<EventCreateWithoutDatesInput, EventUncheckedCreateWithoutDatesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutDatesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutDatesInput, EventUncheckedUpdateWithoutDatesInput>
  }

  export type EventUpdateWithoutDatesInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventNestedInput
    fee?: FeeUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutDatesInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUncheckedUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUncheckedUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventDateZoneUpsertWithWhereUniqueWithoutEventDateInput = {
    where: EventDateZoneWhereUniqueInput
    update: XOR<EventDateZoneUpdateWithoutEventDateInput, EventDateZoneUncheckedUpdateWithoutEventDateInput>
    create: XOR<EventDateZoneCreateWithoutEventDateInput, EventDateZoneUncheckedCreateWithoutEventDateInput>
  }

  export type EventDateZoneUpdateWithWhereUniqueWithoutEventDateInput = {
    where: EventDateZoneWhereUniqueInput
    data: XOR<EventDateZoneUpdateWithoutEventDateInput, EventDateZoneUncheckedUpdateWithoutEventDateInput>
  }

  export type EventDateZoneUpdateManyWithWhereWithoutEventDateInput = {
    where: EventDateZoneScalarWhereInput
    data: XOR<EventDateZoneUpdateManyMutationInput, EventDateZoneUncheckedUpdateManyWithoutEventDateInput>
  }

  export type EventDateZoneScalarWhereInput = {
    AND?: EventDateZoneScalarWhereInput | EventDateZoneScalarWhereInput[]
    OR?: EventDateZoneScalarWhereInput[]
    NOT?: EventDateZoneScalarWhereInput | EventDateZoneScalarWhereInput[]
    eventDateZoneId?: BigIntFilter<"EventDateZone"> | bigint | number
    eventDateId?: BigIntFilter<"EventDateZone"> | bigint | number
    name?: StringFilter<"EventDateZone"> | string
    kind?: EnumZONE_KINDFilter<"EventDateZone"> | $Enums.ZONE_KIND
    basePrice?: DecimalFilter<"EventDateZone"> | Decimal | DecimalJsLike | number | string
    capacity?: IntFilter<"EventDateZone"> | number
    capacityRemaining?: IntFilter<"EventDateZone"> | number
    seatMapId?: BigIntNullableFilter<"EventDateZone"> | bigint | number | null
    currency?: EnumCURRENCYFilter<"EventDateZone"> | $Enums.CURRENCY
    createdAt?: DateTimeFilter<"EventDateZone"> | Date | string
    updatedAt?: DateTimeFilter<"EventDateZone"> | Date | string
  }

  export type EventDateCreateWithoutZoneDatesInput = {
    eventDateId?: bigint | number
    startAt: Date | string
    endAt: Date | string
    event: EventCreateNestedOneWithoutDatesInput
  }

  export type EventDateUncheckedCreateWithoutZoneDatesInput = {
    eventDateId?: bigint | number
    eventId: bigint | number
    startAt: Date | string
    endAt: Date | string
  }

  export type EventDateCreateOrConnectWithoutZoneDatesInput = {
    where: EventDateWhereUniqueInput
    create: XOR<EventDateCreateWithoutZoneDatesInput, EventDateUncheckedCreateWithoutZoneDatesInput>
  }

  export type SeatMapCreateWithoutEventDateZoneInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
    occupiedSeats?: SeatCreateNestedManyWithoutSeatMapInput
  }

  export type SeatMapUncheckedCreateWithoutEventDateZoneInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
    occupiedSeats?: SeatUncheckedCreateNestedManyWithoutSeatMapInput
  }

  export type SeatMapCreateOrConnectWithoutEventDateZoneInput = {
    where: SeatMapWhereUniqueInput
    create: XOR<SeatMapCreateWithoutEventDateZoneInput, SeatMapUncheckedCreateWithoutEventDateZoneInput>
  }

  export type EventDateZoneAllocationCreateWithoutZoneInput = {
    eventDateZoneAllocationId?: bigint | number
    audienceName: string
    discountPercent: Decimal | DecimalJsLike | number | string
    allocatedQuantity: number
    remainingQuantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneAllocationUncheckedCreateWithoutZoneInput = {
    eventDateZoneAllocationId?: bigint | number
    audienceName: string
    discountPercent: Decimal | DecimalJsLike | number | string
    allocatedQuantity: number
    remainingQuantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneAllocationCreateOrConnectWithoutZoneInput = {
    where: EventDateZoneAllocationWhereUniqueInput
    create: XOR<EventDateZoneAllocationCreateWithoutZoneInput, EventDateZoneAllocationUncheckedCreateWithoutZoneInput>
  }

  export type EventDateZoneAllocationCreateManyZoneInputEnvelope = {
    data: EventDateZoneAllocationCreateManyZoneInput | EventDateZoneAllocationCreateManyZoneInput[]
    skipDuplicates?: boolean
  }

  export type EventDateUpsertWithoutZoneDatesInput = {
    update: XOR<EventDateUpdateWithoutZoneDatesInput, EventDateUncheckedUpdateWithoutZoneDatesInput>
    create: XOR<EventDateCreateWithoutZoneDatesInput, EventDateUncheckedCreateWithoutZoneDatesInput>
    where?: EventDateWhereInput
  }

  export type EventDateUpdateToOneWithWhereWithoutZoneDatesInput = {
    where?: EventDateWhereInput
    data: XOR<EventDateUpdateWithoutZoneDatesInput, EventDateUncheckedUpdateWithoutZoneDatesInput>
  }

  export type EventDateUpdateWithoutZoneDatesInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutDatesNestedInput
  }

  export type EventDateUncheckedUpdateWithoutZoneDatesInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatMapUpsertWithoutEventDateZoneInput = {
    update: XOR<SeatMapUpdateWithoutEventDateZoneInput, SeatMapUncheckedUpdateWithoutEventDateZoneInput>
    create: XOR<SeatMapCreateWithoutEventDateZoneInput, SeatMapUncheckedCreateWithoutEventDateZoneInput>
    where?: SeatMapWhereInput
  }

  export type SeatMapUpdateToOneWithWhereWithoutEventDateZoneInput = {
    where?: SeatMapWhereInput
    data: XOR<SeatMapUpdateWithoutEventDateZoneInput, SeatMapUncheckedUpdateWithoutEventDateZoneInput>
  }

  export type SeatMapUpdateWithoutEventDateZoneInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    occupiedSeats?: SeatUpdateManyWithoutSeatMapNestedInput
  }

  export type SeatMapUncheckedUpdateWithoutEventDateZoneInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    occupiedSeats?: SeatUncheckedUpdateManyWithoutSeatMapNestedInput
  }

  export type EventDateZoneAllocationUpsertWithWhereUniqueWithoutZoneInput = {
    where: EventDateZoneAllocationWhereUniqueInput
    update: XOR<EventDateZoneAllocationUpdateWithoutZoneInput, EventDateZoneAllocationUncheckedUpdateWithoutZoneInput>
    create: XOR<EventDateZoneAllocationCreateWithoutZoneInput, EventDateZoneAllocationUncheckedCreateWithoutZoneInput>
  }

  export type EventDateZoneAllocationUpdateWithWhereUniqueWithoutZoneInput = {
    where: EventDateZoneAllocationWhereUniqueInput
    data: XOR<EventDateZoneAllocationUpdateWithoutZoneInput, EventDateZoneAllocationUncheckedUpdateWithoutZoneInput>
  }

  export type EventDateZoneAllocationUpdateManyWithWhereWithoutZoneInput = {
    where: EventDateZoneAllocationScalarWhereInput
    data: XOR<EventDateZoneAllocationUpdateManyMutationInput, EventDateZoneAllocationUncheckedUpdateManyWithoutZoneInput>
  }

  export type EventDateZoneAllocationScalarWhereInput = {
    AND?: EventDateZoneAllocationScalarWhereInput | EventDateZoneAllocationScalarWhereInput[]
    OR?: EventDateZoneAllocationScalarWhereInput[]
    NOT?: EventDateZoneAllocationScalarWhereInput | EventDateZoneAllocationScalarWhereInput[]
    eventDateZoneAllocationId?: BigIntFilter<"EventDateZoneAllocation"> | bigint | number
    eventDateZoneId?: BigIntFilter<"EventDateZoneAllocation"> | bigint | number
    audienceName?: StringFilter<"EventDateZoneAllocation"> | string
    discountPercent?: DecimalFilter<"EventDateZoneAllocation"> | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFilter<"EventDateZoneAllocation"> | number
    remainingQuantity?: IntNullableFilter<"EventDateZoneAllocation"> | number | null
    createdAt?: DateTimeFilter<"EventDateZoneAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"EventDateZoneAllocation"> | Date | string
  }

  export type SeatCreateWithoutSeatMapInput = {
    seatId?: bigint | number
    rowNumber: number
    colNumber: number
  }

  export type SeatUncheckedCreateWithoutSeatMapInput = {
    seatId?: bigint | number
    rowNumber: number
    colNumber: number
  }

  export type SeatCreateOrConnectWithoutSeatMapInput = {
    where: SeatWhereUniqueInput
    create: XOR<SeatCreateWithoutSeatMapInput, SeatUncheckedCreateWithoutSeatMapInput>
  }

  export type SeatCreateManySeatMapInputEnvelope = {
    data: SeatCreateManySeatMapInput | SeatCreateManySeatMapInput[]
    skipDuplicates?: boolean
  }

  export type EventDateZoneCreateWithoutSeatMapInput = {
    eventDateZoneId?: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    eventDate: EventDateCreateNestedOneWithoutZoneDatesInput
    allocations?: EventDateZoneAllocationCreateNestedManyWithoutZoneInput
  }

  export type EventDateZoneUncheckedCreateWithoutSeatMapInput = {
    eventDateZoneId?: bigint | number
    eventDateId: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    allocations?: EventDateZoneAllocationUncheckedCreateNestedManyWithoutZoneInput
  }

  export type EventDateZoneCreateOrConnectWithoutSeatMapInput = {
    where: EventDateZoneWhereUniqueInput
    create: XOR<EventDateZoneCreateWithoutSeatMapInput, EventDateZoneUncheckedCreateWithoutSeatMapInput>
  }

  export type SeatUpsertWithWhereUniqueWithoutSeatMapInput = {
    where: SeatWhereUniqueInput
    update: XOR<SeatUpdateWithoutSeatMapInput, SeatUncheckedUpdateWithoutSeatMapInput>
    create: XOR<SeatCreateWithoutSeatMapInput, SeatUncheckedCreateWithoutSeatMapInput>
  }

  export type SeatUpdateWithWhereUniqueWithoutSeatMapInput = {
    where: SeatWhereUniqueInput
    data: XOR<SeatUpdateWithoutSeatMapInput, SeatUncheckedUpdateWithoutSeatMapInput>
  }

  export type SeatUpdateManyWithWhereWithoutSeatMapInput = {
    where: SeatScalarWhereInput
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyWithoutSeatMapInput>
  }

  export type SeatScalarWhereInput = {
    AND?: SeatScalarWhereInput | SeatScalarWhereInput[]
    OR?: SeatScalarWhereInput[]
    NOT?: SeatScalarWhereInput | SeatScalarWhereInput[]
    seatId?: BigIntFilter<"Seat"> | bigint | number
    seatMapId?: BigIntFilter<"Seat"> | bigint | number
    rowNumber?: IntFilter<"Seat"> | number
    colNumber?: IntFilter<"Seat"> | number
  }

  export type EventDateZoneUpsertWithoutSeatMapInput = {
    update: XOR<EventDateZoneUpdateWithoutSeatMapInput, EventDateZoneUncheckedUpdateWithoutSeatMapInput>
    create: XOR<EventDateZoneCreateWithoutSeatMapInput, EventDateZoneUncheckedCreateWithoutSeatMapInput>
    where?: EventDateZoneWhereInput
  }

  export type EventDateZoneUpdateToOneWithWhereWithoutSeatMapInput = {
    where?: EventDateZoneWhereInput
    data: XOR<EventDateZoneUpdateWithoutSeatMapInput, EventDateZoneUncheckedUpdateWithoutSeatMapInput>
  }

  export type EventDateZoneUpdateWithoutSeatMapInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventDate?: EventDateUpdateOneRequiredWithoutZoneDatesNestedInput
    allocations?: EventDateZoneAllocationUpdateManyWithoutZoneNestedInput
  }

  export type EventDateZoneUncheckedUpdateWithoutSeatMapInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: EventDateZoneAllocationUncheckedUpdateManyWithoutZoneNestedInput
  }

  export type SeatMapCreateWithoutOccupiedSeatsInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
    EventDateZone?: EventDateZoneCreateNestedOneWithoutSeatMapInput
  }

  export type SeatMapUncheckedCreateWithoutOccupiedSeatsInput = {
    seatMapId?: bigint | number
    rows: number
    cols: number
    createdAt?: Date | string
    updatedAt?: Date | string
    EventDateZone?: EventDateZoneUncheckedCreateNestedOneWithoutSeatMapInput
  }

  export type SeatMapCreateOrConnectWithoutOccupiedSeatsInput = {
    where: SeatMapWhereUniqueInput
    create: XOR<SeatMapCreateWithoutOccupiedSeatsInput, SeatMapUncheckedCreateWithoutOccupiedSeatsInput>
  }

  export type SeatMapUpsertWithoutOccupiedSeatsInput = {
    update: XOR<SeatMapUpdateWithoutOccupiedSeatsInput, SeatMapUncheckedUpdateWithoutOccupiedSeatsInput>
    create: XOR<SeatMapCreateWithoutOccupiedSeatsInput, SeatMapUncheckedCreateWithoutOccupiedSeatsInput>
    where?: SeatMapWhereInput
  }

  export type SeatMapUpdateToOneWithWhereWithoutOccupiedSeatsInput = {
    where?: SeatMapWhereInput
    data: XOR<SeatMapUpdateWithoutOccupiedSeatsInput, SeatMapUncheckedUpdateWithoutOccupiedSeatsInput>
  }

  export type SeatMapUpdateWithoutOccupiedSeatsInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    EventDateZone?: EventDateZoneUpdateOneWithoutSeatMapNestedInput
  }

  export type SeatMapUncheckedUpdateWithoutOccupiedSeatsInput = {
    seatMapId?: BigIntFieldUpdateOperationsInput | bigint | number
    rows?: IntFieldUpdateOperationsInput | number
    cols?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    EventDateZone?: EventDateZoneUncheckedUpdateOneWithoutSeatMapNestedInput
  }

  export type EventDateZoneCreateWithoutAllocationsInput = {
    eventDateZoneId?: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
    eventDate: EventDateCreateNestedOneWithoutZoneDatesInput
    seatMap?: SeatMapCreateNestedOneWithoutEventDateZoneInput
  }

  export type EventDateZoneUncheckedCreateWithoutAllocationsInput = {
    eventDateZoneId?: bigint | number
    eventDateId: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    seatMapId?: bigint | number | null
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneCreateOrConnectWithoutAllocationsInput = {
    where: EventDateZoneWhereUniqueInput
    create: XOR<EventDateZoneCreateWithoutAllocationsInput, EventDateZoneUncheckedCreateWithoutAllocationsInput>
  }

  export type EventDateZoneUpsertWithoutAllocationsInput = {
    update: XOR<EventDateZoneUpdateWithoutAllocationsInput, EventDateZoneUncheckedUpdateWithoutAllocationsInput>
    create: XOR<EventDateZoneCreateWithoutAllocationsInput, EventDateZoneUncheckedCreateWithoutAllocationsInput>
    where?: EventDateZoneWhereInput
  }

  export type EventDateZoneUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: EventDateZoneWhereInput
    data: XOR<EventDateZoneUpdateWithoutAllocationsInput, EventDateZoneUncheckedUpdateWithoutAllocationsInput>
  }

  export type EventDateZoneUpdateWithoutAllocationsInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventDate?: EventDateUpdateOneRequiredWithoutZoneDatesNestedInput
    seatMap?: SeatMapUpdateOneWithoutEventDateZoneNestedInput
  }

  export type EventDateZoneUncheckedUpdateWithoutAllocationsInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    seatMapId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateWithoutSalesPhasesInput = {
    eventId?: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventInput
    fee?: FeeCreateNestedOneWithoutEventInput
    categories?: EventToCategoryCreateNestedManyWithoutEventInput
    dates?: EventDateCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutSalesPhasesInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue?: VenueUncheckedCreateNestedOneWithoutEventInput
    categories?: EventToCategoryUncheckedCreateNestedManyWithoutEventInput
    dates?: EventDateUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutSalesPhasesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutSalesPhasesInput, EventUncheckedCreateWithoutSalesPhasesInput>
  }

  export type EventUpsertWithoutSalesPhasesInput = {
    update: XOR<EventUpdateWithoutSalesPhasesInput, EventUncheckedUpdateWithoutSalesPhasesInput>
    create: XOR<EventCreateWithoutSalesPhasesInput, EventUncheckedCreateWithoutSalesPhasesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutSalesPhasesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutSalesPhasesInput, EventUncheckedUpdateWithoutSalesPhasesInput>
  }

  export type EventUpdateWithoutSalesPhasesInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventNestedInput
    fee?: FeeUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUpdateManyWithoutEventNestedInput
    dates?: EventDateUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutSalesPhasesInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUncheckedUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUncheckedUpdateManyWithoutEventNestedInput
    dates?: EventDateUncheckedUpdateManyWithoutEventNestedInput
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

  export type EventCreateManyOrganizerInput = {
    eventId?: bigint | number
    feeId?: bigint | number | null
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateWithoutOrganizerInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneWithoutEventNestedInput
    fee?: FeeUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUpdateManyWithoutEventNestedInput
    dates?: EventDateUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOrganizerInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUncheckedUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUncheckedUpdateManyWithoutEventNestedInput
    dates?: EventDateUncheckedUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutOrganizerInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    feeId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryCreateManyCategoryInput = {
    eventId: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventToCategoryUpdateWithoutCategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type EventToCategoryUncheckedUpdateWithoutCategoryInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryUncheckedUpdateManyWithoutCategoryInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateManyFeeInput = {
    eventId?: bigint | number
    organizerId: bigint | number
    title: string
    status?: $Enums.EVENT_STATUS
    inPerson: boolean
    description: string
    accessPolicy: $Enums.ACCESS_POLICY
    accessPolicyDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateWithoutFeeInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUpdateManyWithoutEventNestedInput
    dates?: EventDateUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutFeeInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUncheckedUpdateOneWithoutEventNestedInput
    categories?: EventToCategoryUncheckedUpdateManyWithoutEventNestedInput
    dates?: EventDateUncheckedUpdateManyWithoutEventNestedInput
    salesPhases?: EventSalesPhaseUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutFeeInput = {
    eventId?: BigIntFieldUpdateOperationsInput | bigint | number
    organizerId?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumEVENT_STATUSFieldUpdateOperationsInput | $Enums.EVENT_STATUS
    inPerson?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    accessPolicy?: EnumACCESS_POLICYFieldUpdateOperationsInput | $Enums.ACCESS_POLICY
    accessPolicyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryCreateManyEventInput = {
    eventCategoryId: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateCreateManyEventInput = {
    eventDateId?: bigint | number
    startAt: Date | string
    endAt: Date | string
  }

  export type EventSalesPhaseCreateManyEventInput = {
    eventSalesPhaseId?: bigint | number
    name: string
    startAt?: Date | string | null
    endAt?: Date | string | null
    percentage: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventToCategoryUpdateWithoutEventInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EventCategoryUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventToCategoryUncheckedUpdateWithoutEventInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventToCategoryUncheckedUpdateManyWithoutEventInput = {
    eventCategoryId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateUpdateWithoutEventInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    zoneDates?: EventDateZoneUpdateManyWithoutEventDateNestedInput
  }

  export type EventDateUncheckedUpdateWithoutEventInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    zoneDates?: EventDateZoneUncheckedUpdateManyWithoutEventDateNestedInput
  }

  export type EventDateUncheckedUpdateManyWithoutEventInput = {
    eventDateId?: BigIntFieldUpdateOperationsInput | bigint | number
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventSalesPhaseUpdateWithoutEventInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventSalesPhaseUncheckedUpdateWithoutEventInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventSalesPhaseUncheckedUpdateManyWithoutEventInput = {
    eventSalesPhaseId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    percentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneCreateManyEventDateInput = {
    eventDateZoneId?: bigint | number
    name: string
    kind: $Enums.ZONE_KIND
    basePrice: Decimal | DecimalJsLike | number | string
    capacity: number
    capacityRemaining: number
    seatMapId?: bigint | number | null
    currency: $Enums.CURRENCY
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneUpdateWithoutEventDateInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seatMap?: SeatMapUpdateOneWithoutEventDateZoneNestedInput
    allocations?: EventDateZoneAllocationUpdateManyWithoutZoneNestedInput
  }

  export type EventDateZoneUncheckedUpdateWithoutEventDateInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    seatMapId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: EventDateZoneAllocationUncheckedUpdateManyWithoutZoneNestedInput
  }

  export type EventDateZoneUncheckedUpdateManyWithoutEventDateInput = {
    eventDateZoneId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    kind?: EnumZONE_KINDFieldUpdateOperationsInput | $Enums.ZONE_KIND
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    capacityRemaining?: IntFieldUpdateOperationsInput | number
    seatMapId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    currency?: EnumCURRENCYFieldUpdateOperationsInput | $Enums.CURRENCY
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneAllocationCreateManyZoneInput = {
    eventDateZoneAllocationId?: bigint | number
    audienceName: string
    discountPercent: Decimal | DecimalJsLike | number | string
    allocatedQuantity: number
    remainingQuantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDateZoneAllocationUpdateWithoutZoneInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneAllocationUncheckedUpdateWithoutZoneInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDateZoneAllocationUncheckedUpdateManyWithoutZoneInput = {
    eventDateZoneAllocationId?: BigIntFieldUpdateOperationsInput | bigint | number
    audienceName?: StringFieldUpdateOperationsInput | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allocatedQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatCreateManySeatMapInput = {
    seatId?: bigint | number
    rowNumber: number
    colNumber: number
  }

  export type SeatUpdateWithoutSeatMapInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
  }

  export type SeatUncheckedUpdateWithoutSeatMapInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
  }

  export type SeatUncheckedUpdateManyWithoutSeatMapInput = {
    seatId?: BigIntFieldUpdateOperationsInput | bigint | number
    rowNumber?: IntFieldUpdateOperationsInput | number
    colNumber?: IntFieldUpdateOperationsInput | number
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