import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}





export interface EscrowAgreement {
  amount: i128;
  buyer: string;
  doc_hash: string;
  is_completed: boolean;
  seller: string;
  visit_status: boolean;
}

export interface Client {
  /**
   * Construct and simulate a confirm_visit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 2. Registrar confirmación de la visita presencial entre las partes
   */
  confirm_visit: ({buyer}: {buyer: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_escrow transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 1. Crear el depósito de reserva con las condiciones iniciales
   */
  create_escrow: ({buyer, seller, amount, doc_hash}: {buyer: string, seller: string, amount: i128, doc_hash: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_agreement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 4. Consultar el estado actual del acuerdo de custodia
   */
  get_agreement: (options?: MethodOptions) => Promise<AssembledTransaction<EscrowAgreement>>

  /**
   * Construct and simulate a release_funds transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 3. Aprobar la documentación y liberar la reserva al vendedor
   */
  release_funds: ({buyer}: {buyer: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAD0VzY3Jvd0FncmVlbWVudAAAAAAGAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAAIZG9jX2hhc2gAAAAQAAAAAAAAAAxpc19jb21wbGV0ZWQAAAABAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAADHZpc2l0X3N0YXR1cwAAAAE=",
        "AAAAAAAAAEMyLiBSZWdpc3RyYXIgY29uZmlybWFjacOzbiBkZSBsYSB2aXNpdGEgcHJlc2VuY2lhbCBlbnRyZSBsYXMgcGFydGVzAAAAAA1jb25maXJtX3Zpc2l0AAAAAAAAAQAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAA==",
        "AAAAAAAAAD4xLiBDcmVhciBlbCBkZXDDs3NpdG8gZGUgcmVzZXJ2YSBjb24gbGFzIGNvbmRpY2lvbmVzIGluaWNpYWxlcwAAAAAADWNyZWF0ZV9lc2Nyb3cAAAAAAAAEAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAhkb2NfaGFzaAAAABAAAAAA",
        "AAAAAAAAADU0LiBDb25zdWx0YXIgZWwgZXN0YWRvIGFjdHVhbCBkZWwgYWN1ZXJkbyBkZSBjdXN0b2RpYQAAAAAAAA1nZXRfYWdyZWVtZW50AAAAAAAAAAAAAAEAAAfQAAAAD0VzY3Jvd0FncmVlbWVudAA=",
        "AAAAAAAAAD0zLiBBcHJvYmFyIGxhIGRvY3VtZW50YWNpw7NuIHkgbGliZXJhciBsYSByZXNlcnZhIGFsIHZlbmRlZG9yAAAAAAAADXJlbGVhc2VfZnVuZHMAAAAAAAABAAAAAAAAAAVidXllcgAAAAAAABMAAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    confirm_visit: this.txFromJSON<null>,
        create_escrow: this.txFromJSON<null>,
        get_agreement: this.txFromJSON<EscrowAgreement>,
        release_funds: this.txFromJSON<null>
  }
}