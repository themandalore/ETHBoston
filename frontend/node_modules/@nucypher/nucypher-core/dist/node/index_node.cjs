'use strict';

var node_crypto = require('node:crypto');

let wasm$1;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm$1.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm$1.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm$1.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {Uint8Array} data
* @param {DkgPublicKey} public_key
* @param {Conditions} conditions
* @returns {[Ciphertext, AuthenticatedData]}
*/
function encryptForDkg(data, public_key, conditions) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(public_key, DkgPublicKey);
        _assertClass(conditions, Conditions);
        wasm$1.encryptForDkg(retptr, ptr0, len0, public_key.__wbg_ptr, conditions.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {PublicKey} delegating_pk
* @param {Uint8Array} plaintext
* @returns {[Capsule, Uint8Array]}
*/
function encrypt(delegating_pk, plaintext) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(delegating_pk, PublicKey);
        const ptr0 = passArray8ToWasm0(plaintext, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm$1.encrypt(retptr, delegating_pk.__wbg_ptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {SecretKey} delegating_sk
* @param {Capsule} capsule
* @param {Uint8Array} ciphertext
* @returns {Uint8Array}
*/
function decryptOriginal(delegating_sk, capsule, ciphertext) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(delegating_sk, SecretKey);
        _assertClass(capsule, Capsule);
        const ptr0 = passArray8ToWasm0(ciphertext, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm$1.decryptOriginal(retptr, delegating_sk.__wbg_ptr, capsule.__wbg_ptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        if (r3) {
            throw takeObject(r2);
        }
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm$1.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {SecretKey} receiving_sk
* @param {PublicKey} delegating_pk
* @param {Capsule} capsule
* @param {VerifiedCapsuleFrag[]} vcfrags
* @param {Uint8Array} ciphertext
* @returns {Uint8Array}
*/
function decryptReencrypted(receiving_sk, delegating_pk, capsule, vcfrags, ciphertext) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(receiving_sk, SecretKey);
        _assertClass(delegating_pk, PublicKey);
        _assertClass(capsule, Capsule);
        const ptr0 = passArray8ToWasm0(ciphertext, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm$1.decryptReencrypted(retptr, receiving_sk.__wbg_ptr, delegating_pk.__wbg_ptr, capsule.__wbg_ptr, addBorrowedObject(vcfrags), ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        if (r3) {
            throw takeObject(r2);
        }
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm$1.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {SecretKey} delegating_sk
* @param {PublicKey} receiving_pk
* @param {Signer} signer
* @param {number} threshold
* @param {number} shares
* @param {boolean} sign_delegating_key
* @param {boolean} sign_receiving_key
* @returns {VerifiedKeyFrag[]}
*/
function generateKFrags(delegating_sk, receiving_pk, signer, threshold, shares, sign_delegating_key, sign_receiving_key) {
    _assertClass(delegating_sk, SecretKey);
    _assertClass(receiving_pk, PublicKey);
    _assertClass(signer, Signer);
    const ret = wasm$1.generateKFrags(delegating_sk.__wbg_ptr, receiving_pk.__wbg_ptr, signer.__wbg_ptr, threshold, shares, sign_delegating_key, sign_receiving_key);
    return takeObject(ret);
}

/**
* @param {Capsule} capsule
* @param {VerifiedKeyFrag} kfrag
* @returns {VerifiedCapsuleFrag}
*/
function reencrypt(capsule, kfrag) {
    _assertClass(capsule, Capsule);
    _assertClass(kfrag, VerifiedKeyFrag);
    const ret = wasm$1.reencrypt(capsule.__wbg_ptr, kfrag.__wbg_ptr);
    return VerifiedCapsuleFrag.__wrap(ret);
}

/**
* @param {Uint8Array} message
* @param {Uint8Array} aad
* @param {DkgPublicKey} dkg_public_key
* @returns {Ciphertext}
*/
function ferveoEncrypt(message, aad, dkg_public_key) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(message, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(aad, wasm$1.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        _assertClass(dkg_public_key, DkgPublicKey);
        wasm$1.ferveoEncrypt(retptr, ptr0, len0, ptr1, len1, dkg_public_key.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return Ciphertext.__wrap(r0);
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {DecryptionShareSimple[]} decryption_shares_js
* @returns {SharedSecret}
*/
function combineDecryptionSharesSimple(decryption_shares_js) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        wasm$1.combineDecryptionSharesSimple(retptr, addBorrowedObject(decryption_shares_js));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return SharedSecret.__wrap(r0);
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {DecryptionSharePrecomputed[]} decryption_shares_js
* @returns {SharedSecret}
*/
function combineDecryptionSharesPrecomputed(decryption_shares_js) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        wasm$1.combineDecryptionSharesPrecomputed(retptr, addBorrowedObject(decryption_shares_js));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return SharedSecret.__wrap(r0);
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {Ciphertext} ciphertext
* @param {Uint8Array} aad
* @param {SharedSecret} shared_secret
* @returns {Uint8Array}
*/
function decryptWithSharedSecret(ciphertext, aad, shared_secret) {
    try {
        const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(ciphertext, Ciphertext);
        const ptr0 = passArray8ToWasm0(aad, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(shared_secret, SharedSecret);
        wasm$1.decryptWithSharedSecret(retptr, ciphertext.__wbg_ptr, ptr0, len0, shared_secret.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        if (r3) {
            throw takeObject(r2);
        }
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm$1.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm$1.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
class AccessControlPolicy {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AccessControlPolicy.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_accesscontrolpolicy_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {AccessControlPolicy}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.accesscontrolpolicy_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccessControlPolicy.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.accesscontrolpolicy_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {AccessControlPolicy} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, AccessControlPolicy);
        const ret = wasm$1.accesscontrolpolicy_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {AuthenticatedData} auth_data
    * @param {Uint8Array} authorization
    */
    constructor(auth_data, authorization) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(auth_data, AuthenticatedData);
            const ptr0 = passArray8ToWasm0(authorization, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.accesscontrolpolicy_new(retptr, auth_data.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccessControlPolicy.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    aad() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.accesscontrolpolicy_aad(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {DkgPublicKey}
    */
    get publicKey() {
        const ret = wasm$1.accesscontrolpolicy_publicKey(this.__wbg_ptr);
        return DkgPublicKey.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    get authorization() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.accesscontrolpolicy_authorization(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Conditions}
    */
    get conditions() {
        const ret = wasm$1.accesscontrolpolicy_conditions(this.__wbg_ptr);
        return Conditions.__wrap(ret);
    }
}
/**
*/
class Address {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Address.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_address_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.address___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Address} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Address);
        const ret = wasm$1.address_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} address_bytes
    */
    constructor(address_bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(address_bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.address_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.address_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class AggregatedTranscript {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AggregatedTranscript.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_aggregatedtranscript_free(ptr);
    }
    /**
    * @param {AggregatedTranscript} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, AggregatedTranscript);
        const ret = wasm$1.aggregatedtranscript_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {AggregatedTranscript}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.aggregatedtranscript_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AggregatedTranscript.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.aggregatedtranscript_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ValidatorMessage[]} messages
    */
    constructor(messages) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.aggregatedtranscript_new(retptr, addBorrowedObject(messages));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AggregatedTranscript.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {number} shares_num
    * @param {ValidatorMessage[]} messages
    * @returns {boolean}
    */
    verify(shares_num, messages) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.aggregatedtranscript_verify(retptr, this.__wbg_ptr, shares_num, addBorrowedObject(messages));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 !== 0;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {Dkg} dkg
    * @param {CiphertextHeader} ciphertext_header
    * @param {Uint8Array} aad
    * @param {Keypair} validator_keypair
    * @returns {DecryptionSharePrecomputed}
    */
    createDecryptionSharePrecomputed(dkg, ciphertext_header, aad, validator_keypair) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(dkg, Dkg);
            _assertClass(ciphertext_header, CiphertextHeader);
            const ptr0 = passArray8ToWasm0(aad, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(validator_keypair, Keypair);
            wasm$1.aggregatedtranscript_createDecryptionSharePrecomputed(retptr, this.__wbg_ptr, dkg.__wbg_ptr, ciphertext_header.__wbg_ptr, ptr0, len0, validator_keypair.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DecryptionSharePrecomputed.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Dkg} dkg
    * @param {CiphertextHeader} ciphertext_header
    * @param {Uint8Array} aad
    * @param {Keypair} validator_keypair
    * @returns {DecryptionShareSimple}
    */
    createDecryptionShareSimple(dkg, ciphertext_header, aad, validator_keypair) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(dkg, Dkg);
            _assertClass(ciphertext_header, CiphertextHeader);
            const ptr0 = passArray8ToWasm0(aad, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(validator_keypair, Keypair);
            wasm$1.aggregatedtranscript_createDecryptionShareSimple(retptr, this.__wbg_ptr, dkg.__wbg_ptr, ciphertext_header.__wbg_ptr, ptr0, len0, validator_keypair.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DecryptionShareSimple.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class AuthenticatedData {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AuthenticatedData.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_authenticateddata_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {AuthenticatedData}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.authenticateddata_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AuthenticatedData.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.authenticateddata_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {AuthenticatedData} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, AuthenticatedData);
        const ret = wasm$1.authenticateddata_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {DkgPublicKey} public_key
    * @param {Conditions} conditions
    */
    constructor(public_key, conditions) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, DkgPublicKey);
            _assertClass(conditions, Conditions);
            wasm$1.authenticateddata_new(retptr, public_key.__wbg_ptr, conditions.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AuthenticatedData.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    aad() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.authenticateddata_aad(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {DkgPublicKey}
    */
    get publicKey() {
        const ret = wasm$1.authenticateddata_publicKey(this.__wbg_ptr);
        return DkgPublicKey.__wrap(ret);
    }
    /**
    * @returns {Conditions}
    */
    get conditions() {
        const ret = wasm$1.authenticateddata_conditions(this.__wbg_ptr);
        return Conditions.__wrap(ret);
    }
}
/**
*/
class Capsule {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Capsule.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_capsule_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsule___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsule_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytesSimple() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsule_toBytesSimple(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {Capsule}
    */
    static fromBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.capsule_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Capsule.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsule_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Capsule} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Capsule);
        const ret = wasm$1.capsule_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class CapsuleFrag {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CapsuleFrag.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_capsulefrag_free(ptr);
    }
    /**
    * @param {Capsule} capsule
    * @param {PublicKey} verifying_pk
    * @param {PublicKey} delegating_pk
    * @param {PublicKey} receiving_pk
    * @returns {VerifiedCapsuleFrag}
    */
    verify(capsule, verifying_pk, delegating_pk, receiving_pk) {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(capsule, Capsule);
            _assertClass(verifying_pk, PublicKey);
            _assertClass(delegating_pk, PublicKey);
            _assertClass(receiving_pk, PublicKey);
            wasm$1.capsulefrag_verify(retptr, ptr, capsule.__wbg_ptr, verifying_pk.__wbg_ptr, delegating_pk.__wbg_ptr, receiving_pk.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return VerifiedCapsuleFrag.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsulefrag_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytesSimple() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsulefrag_toBytesSimple(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {CapsuleFrag}
    */
    static fromBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.capsulefrag_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CapsuleFrag.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsulefrag_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {VerifiedCapsuleFrag}
    */
    skipVerification() {
        const ret = wasm$1.capsulefrag_skipVerification(this.__wbg_ptr);
        return VerifiedCapsuleFrag.__wrap(ret);
    }
    /**
    * @param {CapsuleFrag} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, CapsuleFrag);
        const ret = wasm$1.capsulefrag_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class Ciphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Ciphertext.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_ciphertext_free(ptr);
    }
    /**
    * @returns {CiphertextHeader}
    */
    get header() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ciphertext_header(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CiphertextHeader.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    get payload() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ciphertext_payload(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Ciphertext} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Ciphertext);
        const ret = wasm$1.ciphertext_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Ciphertext}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.ciphertext_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Ciphertext.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ciphertext_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class CiphertextHeader {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CiphertextHeader.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_ciphertextheader_free(ptr);
    }
    /**
    * @param {CiphertextHeader} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, CiphertextHeader);
        const ret = wasm$1.ciphertextheader_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {CiphertextHeader}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.ciphertextheader_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CiphertextHeader.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ciphertextheader_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class Conditions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Conditions.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_conditions_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.conditions___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.conditions_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Conditions} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Conditions);
        const ret = wasm$1.conditions_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {string} conditions
    */
    constructor(conditions) {
        const ptr0 = passStringToWasm0(conditions, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.conditions_new(ptr0, len0);
        return Conditions.__wrap(ret);
    }
    /**
    * @param {string} data
    * @returns {Conditions}
    */
    static fromBytes(data) {
        const ptr0 = passStringToWasm0(data, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.conditions_fromBytes(ptr0, len0);
        return Conditions.__wrap(ret);
    }
}
/**
*/
class Context {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Context.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_context_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.context___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.context_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Context} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Context);
        const ret = wasm$1.conditions_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {string} context
    */
    constructor(context) {
        const ptr0 = passStringToWasm0(context, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.context_new(ptr0, len0);
        return Context.__wrap(ret);
    }
    /**
    * @param {string} data
    * @returns {Context}
    */
    static fromBytes(data) {
        const ptr0 = passStringToWasm0(data, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.context_fromBytes(ptr0, len0);
        return Context.__wrap(ret);
    }
}
/**
*/
class CurvePoint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CurvePoint.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_curvepoint_free(ptr);
    }
    /**
    * @returns {[Uint8Array, Uint8Array] | undefined}
    */
    coordinates() {
        const ret = wasm$1.curvepoint_coordinates(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
class DecryptionSharePrecomputed {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DecryptionSharePrecomputed.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_decryptionshareprecomputed_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.decryptionshareprecomputed___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {DecryptionSharePrecomputed} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, DecryptionSharePrecomputed);
        const ret = wasm$1.decryptionshareprecomputed_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {DecryptionSharePrecomputed}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.decryptionshareprecomputed_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DecryptionSharePrecomputed.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.decryptionshareprecomputed_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class DecryptionShareSimple {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DecryptionShareSimple.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_decryptionsharesimple_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.decryptionsharesimple___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {DecryptionShareSimple} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, DecryptionShareSimple);
        const ret = wasm$1.decryptionsharesimple_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {DecryptionShareSimple}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.decryptionsharesimple_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DecryptionShareSimple.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.decryptionsharesimple_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class Dkg {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Dkg.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_dkg_free(ptr);
    }
    /**
    * @param {number} tau
    * @param {number} shares_num
    * @param {number} security_threshold
    * @param {Validator[]} validators_js
    * @param {Validator} me
    */
    constructor(tau, shares_num, security_threshold, validators_js, me) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(me, Validator);
            wasm$1.dkg_new(retptr, tau, shares_num, security_threshold, addBorrowedObject(validators_js), me.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Dkg.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {DkgPublicKey}
    */
    publicKey() {
        const ret = wasm$1.dkg_publicKey(this.__wbg_ptr);
        return DkgPublicKey.__wrap(ret);
    }
    /**
    * @returns {Transcript}
    */
    generateTranscript() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.dkg_generateTranscript(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transcript.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ValidatorMessage[]} messages_js
    * @returns {AggregatedTranscript}
    */
    aggregateTranscript(messages_js) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.dkg_aggregateTranscript(retptr, this.__wbg_ptr, addBorrowedObject(messages_js));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AggregatedTranscript.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class DkgPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DkgPublicKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_dkgpublickey_free(ptr);
    }
    /**
    * @param {DkgPublicKey} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, DkgPublicKey);
        const ret = wasm$1.dkgpublickey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {DkgPublicKey}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.dkgpublickey_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DkgPublicKey.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.dkgpublickey_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    static serializedSize() {
        const ret = wasm$1.dkgpublickey_serializedSize();
        return ret >>> 0;
    }
    /**
    * @returns {DkgPublicKey}
    */
    static random() {
        const ret = wasm$1.dkgpublickey_random();
        return DkgPublicKey.__wrap(ret);
    }
}
/**
*/
class EncryptedKeyFrag {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EncryptedKeyFrag.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_encryptedkeyfrag_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.encryptedkeyfrag___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {EncryptedKeyFrag}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.encryptedkeyfrag_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EncryptedKeyFrag.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Signer} signer
    * @param {PublicKey} recipient_key
    * @param {HRAC} hrac
    * @param {VerifiedKeyFrag} verified_kfrag
    */
    constructor(signer, recipient_key, hrac, verified_kfrag) {
        _assertClass(signer, Signer);
        _assertClass(recipient_key, PublicKey);
        _assertClass(hrac, HRAC);
        _assertClass(verified_kfrag, VerifiedKeyFrag);
        const ret = wasm$1.encryptedkeyfrag_new(signer.__wbg_ptr, recipient_key.__wbg_ptr, hrac.__wbg_ptr, verified_kfrag.__wbg_ptr);
        return EncryptedKeyFrag.__wrap(ret);
    }
    /**
    * @param {SecretKey} sk
    * @param {HRAC} hrac
    * @param {PublicKey} publisher_verifying_key
    * @returns {VerifiedKeyFrag}
    */
    decrypt(sk, hrac, publisher_verifying_key) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(sk, SecretKey);
            _assertClass(hrac, HRAC);
            _assertClass(publisher_verifying_key, PublicKey);
            wasm$1.encryptedkeyfrag_decrypt(retptr, this.__wbg_ptr, sk.__wbg_ptr, hrac.__wbg_ptr, publisher_verifying_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return VerifiedKeyFrag.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.encryptedkeyfrag_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class EncryptedThresholdDecryptionRequest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EncryptedThresholdDecryptionRequest.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_encryptedthresholddecryptionrequest_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {EncryptedThresholdDecryptionRequest}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.encryptedthresholddecryptionrequest_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EncryptedThresholdDecryptionRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.encryptedthresholddecryptionrequest_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    get ritualId() {
        const ret = wasm$1.encryptedthresholddecryptionrequest_ritualId(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {SessionStaticKey}
    */
    get requesterPublicKey() {
        const ret = wasm$1.encryptedthresholddecryptionrequest_requesterPublicKey(this.__wbg_ptr);
        return SessionStaticKey.__wrap(ret);
    }
    /**
    * @param {SessionSharedSecret} shared_secret
    * @returns {ThresholdDecryptionRequest}
    */
    decrypt(shared_secret) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(shared_secret, SessionSharedSecret);
            wasm$1.encryptedthresholddecryptionrequest_decrypt(retptr, this.__wbg_ptr, shared_secret.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdDecryptionRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class EncryptedThresholdDecryptionResponse {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EncryptedThresholdDecryptionResponse.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_encryptedthresholddecryptionresponse_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {EncryptedThresholdDecryptionResponse}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.encryptedthresholddecryptionresponse_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EncryptedThresholdDecryptionResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.encryptedthresholddecryptionresponse_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    get ritualId() {
        const ret = wasm$1.encryptedthresholddecryptionrequest_ritualId(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {SessionSharedSecret} shared_secret
    * @returns {ThresholdDecryptionResponse}
    */
    decrypt(shared_secret) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(shared_secret, SessionSharedSecret);
            wasm$1.encryptedthresholddecryptionresponse_decrypt(retptr, this.__wbg_ptr, shared_secret.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdDecryptionResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class EncryptedTreasureMap {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EncryptedTreasureMap.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_encryptedtreasuremap_free(ptr);
    }
    /**
    * @param {EncryptedTreasureMap} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, EncryptedTreasureMap);
        const ret = wasm$1.encryptedtreasuremap_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {EncryptedTreasureMap}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.encryptedtreasuremap_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EncryptedTreasureMap.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {SecretKey} sk
    * @param {PublicKey} publisher_verifying_key
    * @returns {TreasureMap}
    */
    decrypt(sk, publisher_verifying_key) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(sk, SecretKey);
            _assertClass(publisher_verifying_key, PublicKey);
            wasm$1.encryptedtreasuremap_decrypt(retptr, this.__wbg_ptr, sk.__wbg_ptr, publisher_verifying_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TreasureMap.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.encryptedtreasuremap_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class EthereumAddress {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EthereumAddress.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_ethereumaddress_free(ptr);
    }
    /**
    * @param {string} address
    * @returns {EthereumAddress}
    */
    static fromString(address) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(address, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.ethereumaddress_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EthereumAddress.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ethereumaddress_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr1 = r0;
            var len1 = r1;
            if (r3) {
                ptr1 = 0; len1 = 0;
                throw takeObject(r2);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
}
/**
*/
class FerveoPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FerveoPublicKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_ferveopublickey_free(ptr);
    }
    /**
    * @param {FerveoPublicKey} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, FerveoPublicKey);
        const ret = wasm$1.ferveopublickey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {FerveoPublicKey}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.ferveopublickey_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FerveoPublicKey.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ferveopublickey_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    static serializedSize() {
        const ret = wasm$1.ferveopublickey_serializedSize();
        return ret >>> 0;
    }
}
/**
*/
class FerveoVariant {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FerveoVariant.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_ferveovariant_free(ptr);
    }
    /**
    * @param {FerveoVariant} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, FerveoVariant);
        const ret = wasm$1.ferveovariant_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {FerveoVariant}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.ferveovariant_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FerveoVariant.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ferveovariant_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FerveoVariant}
    */
    static get precomputed() {
        const ret = wasm$1.ferveovariant_precomputed();
        return FerveoVariant.__wrap(ret);
    }
    /**
    * @returns {FerveoVariant}
    */
    static get simple() {
        const ret = wasm$1.ferveovariant_simple();
        return FerveoVariant.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.ferveovariant_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
class FleetStateChecksum {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FleetStateChecksum.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_fleetstatechecksum_free(ptr);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.fleetstatechecksum_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {NodeMetadata[]} other_nodes
    * @param {NodeMetadata | null} this_node
    */
    constructor(other_nodes, this_node) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.fleetstatechecksum_new(retptr, addBorrowedObject(other_nodes), addBorrowedObject(this_node));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FleetStateChecksum.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.fleetstatechecksum_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class HRAC {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(HRAC.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_hrac_free(ptr);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.hrac_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {HRAC} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, HRAC);
        const ret = wasm$1.hrac_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {PublicKey} publisher_verifying_key
    * @param {PublicKey} bob_verifying_key
    * @param {Uint8Array} label
    */
    constructor(publisher_verifying_key, bob_verifying_key, label) {
        _assertClass(publisher_verifying_key, PublicKey);
        _assertClass(bob_verifying_key, PublicKey);
        const ptr0 = passArray8ToWasm0(label, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.hrac_new(publisher_verifying_key.__wbg_ptr, bob_verifying_key.__wbg_ptr, ptr0, len0);
        return HRAC.__wrap(ret);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {HRAC}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.hrac_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return HRAC.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.hrac_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class KeyFrag {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(KeyFrag.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_keyfrag_free(ptr);
    }
    /**
    * @param {PublicKey} verifying_pk
    * @param {PublicKey | null} delegating_pk
    * @param {PublicKey | null} receiving_pk
    * @returns {VerifiedKeyFrag}
    */
    verify(verifying_pk, delegating_pk, receiving_pk) {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(verifying_pk, PublicKey);
            wasm$1.keyfrag_verify(retptr, ptr, verifying_pk.__wbg_ptr, addBorrowedObject(delegating_pk), addBorrowedObject(receiving_pk));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return VerifiedKeyFrag.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.keyfrag_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {KeyFrag}
    */
    static fromBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.keyfrag_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return KeyFrag.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.keyfrag_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {VerifiedKeyFrag}
    */
    skipVerification() {
        const ret = wasm$1.keyfrag_skipVerification(this.__wbg_ptr);
        return VerifiedKeyFrag.__wrap(ret);
    }
    /**
    * @param {KeyFrag} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, KeyFrag);
        const ret = wasm$1.keyfrag_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class Keypair {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Keypair.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_keypair_free(ptr);
    }
    /**
    * @param {Keypair} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Keypair);
        const ret = wasm$1.keypair_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Keypair}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.keypair_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Keypair.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.keypair_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    static get secureRandomnessSize() {
        const ret = wasm$1.keypair_secureRandomnessSize();
        return ret >>> 0;
    }
    /**
    * @returns {FerveoPublicKey}
    */
    get publicKey() {
        const ret = wasm$1.keypair_publicKey(this.__wbg_ptr);
        return FerveoPublicKey.__wrap(ret);
    }
    /**
    * @returns {Keypair}
    */
    static random() {
        const ret = wasm$1.keypair_random();
        return Keypair.__wrap(ret);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Keypair}
    */
    static fromSecureRandomness(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.keypair_fromSecureRandomness(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Keypair.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class MessageKit {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MessageKit.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_messagekit_free(ptr);
    }
    /**
    * @param {MessageKit} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, MessageKit);
        const ret = wasm$1.messagekit_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {MessageKit}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.messagekit_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MessageKit.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.messagekit_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {PublicKey} policy_encrypting_key
    * @param {Uint8Array} plaintext
    * @param {Conditions | null} conditions
    */
    constructor(policy_encrypting_key, plaintext, conditions) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(policy_encrypting_key, PublicKey);
            const ptr0 = passArray8ToWasm0(plaintext, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.messagekit_new(retptr, policy_encrypting_key.__wbg_ptr, ptr0, len0, addBorrowedObject(conditions));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MessageKit.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {SecretKey} sk
    * @returns {Uint8Array}
    */
    decrypt(sk) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(sk, SecretKey);
            wasm$1.messagekit_decrypt(retptr, this.__wbg_ptr, sk.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Capsule}
    */
    get capsule() {
        const ret = wasm$1.messagekit_capsule(this.__wbg_ptr);
        return Capsule.__wrap(ret);
    }
    /**
    * @returns {Conditions | undefined}
    */
    get conditions() {
        const ret = wasm$1.messagekit_conditions(this.__wbg_ptr);
        return ret === 0 ? undefined : Conditions.__wrap(ret);
    }
    /**
    * @param {SecretKey} sk
    * @param {PublicKey} policy_encrypting_key
    * @param {VerifiedCapsuleFrag[]} vcfrags
    * @returns {Uint8Array}
    */
    decryptReencrypted(sk, policy_encrypting_key, vcfrags) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(sk, SecretKey);
            _assertClass(policy_encrypting_key, PublicKey);
            wasm$1.messagekit_decryptReencrypted(retptr, this.__wbg_ptr, sk.__wbg_ptr, policy_encrypting_key.__wbg_ptr, addBorrowedObject(vcfrags));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class MetadataRequest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MetadataRequest.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_metadatarequest_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {MetadataRequest}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.metadatarequest_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MetadataRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {FleetStateChecksum} fleet_state_checksum
    * @param {NodeMetadata[]} announce_nodes
    */
    constructor(fleet_state_checksum, announce_nodes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(fleet_state_checksum, FleetStateChecksum);
            wasm$1.metadatarequest_new(retptr, fleet_state_checksum.__wbg_ptr, addBorrowedObject(announce_nodes));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MetadataRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {FleetStateChecksum}
    */
    get fleetStateChecksum() {
        const ret = wasm$1.metadatarequest_fleetStateChecksum(this.__wbg_ptr);
        return FleetStateChecksum.__wrap(ret);
    }
    /**
    * @returns {NodeMetadata[]}
    */
    get announceNodes() {
        const ret = wasm$1.metadatarequest_announceNodes(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.metadatarequest_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class MetadataResponse {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MetadataResponse.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_metadataresponse_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {MetadataResponse}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.metadataresponse_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MetadataResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Signer} signer
    * @param {MetadataResponsePayload} response
    */
    constructor(signer, response) {
        _assertClass(signer, Signer);
        _assertClass(response, MetadataResponsePayload);
        const ret = wasm$1.metadataresponse_new(signer.__wbg_ptr, response.__wbg_ptr);
        return MetadataResponse.__wrap(ret);
    }
    /**
    * @param {PublicKey} verifying_pk
    * @returns {MetadataResponsePayload}
    */
    verify(verifying_pk) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(verifying_pk, PublicKey);
            wasm$1.metadataresponse_verify(retptr, this.__wbg_ptr, verifying_pk.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MetadataResponsePayload.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.metadataresponse_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class MetadataResponsePayload {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MetadataResponsePayload.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_metadataresponsepayload_free(ptr);
    }
    /**
    * @param {number} timestamp_epoch
    * @param {NodeMetadata[]} announce_nodes
    */
    constructor(timestamp_epoch, announce_nodes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.metadataresponsepayload_new(retptr, timestamp_epoch, addBorrowedObject(announce_nodes));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return MetadataResponsePayload.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {number}
    */
    get timestamp_epoch() {
        const ret = wasm$1.encryptedthresholddecryptionrequest_ritualId(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {NodeMetadata[]}
    */
    get announceNodes() {
        const ret = wasm$1.metadatarequest_announceNodes(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
class NodeMetadata {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NodeMetadata.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_nodemetadata_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.nodemetadata___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {NodeMetadata}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.nodemetadata_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return NodeMetadata.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Signer} signer
    * @param {NodeMetadataPayload} payload
    */
    constructor(signer, payload) {
        _assertClass(signer, Signer);
        _assertClass(payload, NodeMetadataPayload);
        const ret = wasm$1.nodemetadata_new(signer.__wbg_ptr, payload.__wbg_ptr);
        return NodeMetadata.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    verify() {
        const ret = wasm$1.nodemetadata_verify(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {NodeMetadataPayload}
    */
    get payload() {
        const ret = wasm$1.nodemetadata_payload(this.__wbg_ptr);
        return NodeMetadataPayload.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.nodemetadata_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class NodeMetadataPayload {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NodeMetadataPayload.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_nodemetadatapayload_free(ptr);
    }
    /**
    * @param {Address} staking_provider_address
    * @param {string} domain
    * @param {number} timestamp_epoch
    * @param {PublicKey} verifying_key
    * @param {PublicKey} encrypting_key
    * @param {FerveoPublicKey} ferveo_public_key
    * @param {Uint8Array} certificate_der
    * @param {string} host
    * @param {number} port
    * @param {RecoverableSignature} operator_signature
    */
    constructor(staking_provider_address, domain, timestamp_epoch, verifying_key, encrypting_key, ferveo_public_key, certificate_der, host, port, operator_signature) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(staking_provider_address, Address);
            const ptr0 = passStringToWasm0(domain, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(verifying_key, PublicKey);
            _assertClass(encrypting_key, PublicKey);
            _assertClass(ferveo_public_key, FerveoPublicKey);
            const ptr1 = passArray8ToWasm0(certificate_der, wasm$1.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(host, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            _assertClass(operator_signature, RecoverableSignature);
            wasm$1.nodemetadatapayload_new(retptr, staking_provider_address.__wbg_ptr, ptr0, len0, timestamp_epoch, verifying_key.__wbg_ptr, encrypting_key.__wbg_ptr, ferveo_public_key.__wbg_ptr, ptr1, len1, ptr2, len2, port, operator_signature.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return NodeMetadataPayload.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Address}
    */
    get staking_provider_address() {
        const ret = wasm$1.nodemetadatapayload_staking_provider_address(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    get verifyingKey() {
        const ret = wasm$1.nodemetadatapayload_verifyingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    get encryptingKey() {
        const ret = wasm$1.nodemetadatapayload_encryptingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {RecoverableSignature}
    */
    get operator_signature() {
        const ret = wasm$1.nodemetadatapayload_operator_signature(this.__wbg_ptr);
        return RecoverableSignature.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    get domain() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.nodemetadatapayload_domain(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    get host() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.nodemetadatapayload_host(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {number}
    */
    get port() {
        const ret = wasm$1.nodemetadatapayload_port(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get timestampEpoch() {
        const ret = wasm$1.nodemetadatapayload_timestampEpoch(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Uint8Array}
    */
    get certificate_der() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.nodemetadatapayload_certificate_der(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Address}
    */
    deriveOperatorAddress() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.nodemetadatapayload_deriveOperatorAddress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class Parameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Parameters.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_parameters_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm$1.parameters_new();
        return Parameters.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get u() {
        const ret = wasm$1.parameters_u(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
}
/**
*/
class PublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PublicKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_publickey_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.publickey___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toCompressedBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.publickey_toCompressedBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {PublicKey}
    */
    static fromCompressedBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.publickey_fromCompressedBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PublicKey.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} prehash
    * @param {RecoverableSignature} signature
    * @returns {PublicKey}
    */
    static recoverFromPrehash(prehash, signature) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(prehash, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(signature, RecoverableSignature);
            wasm$1.publickey_recoverFromPrehash(retptr, ptr0, len0, signature.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PublicKey.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.publickey_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {PublicKey} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, PublicKey);
        const ret = wasm$1.publickey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class RecoverableSignature {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RecoverableSignature.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_recoverablesignature_free(ptr);
    }
    /**
    * @returns {Uint8Array}
    */
    toBEBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.recoverablesignature_toBEBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {RecoverableSignature}
    */
    static fromBEBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.recoverablesignature_fromBEBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RecoverableSignature.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.recoverablesignature_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {RecoverableSignature} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, RecoverableSignature);
        const ret = wasm$1.recoverablesignature_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class ReencryptionEvidence {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ReencryptionEvidence.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_reencryptionevidence_free(ptr);
    }
    /**
    * @param {Capsule} capsule
    * @param {VerifiedCapsuleFrag} vcfrag
    * @param {PublicKey} verifying_pk
    * @param {PublicKey} delegating_pk
    * @param {PublicKey} receiving_pk
    */
    constructor(capsule, vcfrag, verifying_pk, delegating_pk, receiving_pk) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(capsule, Capsule);
            _assertClass(vcfrag, VerifiedCapsuleFrag);
            _assertClass(verifying_pk, PublicKey);
            _assertClass(delegating_pk, PublicKey);
            _assertClass(receiving_pk, PublicKey);
            wasm$1.reencryptionevidence_new(retptr, capsule.__wbg_ptr, vcfrag.__wbg_ptr, verifying_pk.__wbg_ptr, delegating_pk.__wbg_ptr, receiving_pk.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReencryptionEvidence.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.reencryptionevidence_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {ReencryptionEvidence}
    */
    static fromBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.reencryptionevidence_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReencryptionEvidence.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {CurvePoint}
    */
    get e() {
        const ret = wasm$1.parameters_u(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get ez() {
        const ret = wasm$1.reencryptionevidence_ez(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get e1() {
        const ret = wasm$1.reencryptionevidence_e1(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get e1h() {
        const ret = wasm$1.reencryptionevidence_e1h(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get e2() {
        const ret = wasm$1.reencryptionevidence_e2(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get v() {
        const ret = wasm$1.reencryptionevidence_v(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get vz() {
        const ret = wasm$1.reencryptionevidence_vz(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get v1() {
        const ret = wasm$1.reencryptionevidence_v1(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get v1h() {
        const ret = wasm$1.reencryptionevidence_v1h(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get v2() {
        const ret = wasm$1.reencryptionevidence_v2(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get uz() {
        const ret = wasm$1.reencryptionevidence_uz(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get u1() {
        const ret = wasm$1.reencryptionevidence_u1(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get u1h() {
        const ret = wasm$1.reencryptionevidence_u1h(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {CurvePoint}
    */
    get u2() {
        const ret = wasm$1.reencryptionevidence_u2(this.__wbg_ptr);
        return CurvePoint.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    get kfragValidityMessageHash() {
        const ret = wasm$1.reencryptionevidence_kfragValidityMessageHash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {boolean}
    */
    get kfragSignatureV() {
        const ret = wasm$1.reencryptionevidence_kfragSignatureV(this.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class ReencryptionRequest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ReencryptionRequest.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_reencryptionrequest_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ReencryptionRequest}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.reencryptionrequest_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReencryptionRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Capsule[]} capsules
    * @param {HRAC} hrac
    * @param {EncryptedKeyFrag} encrypted_kfrag
    * @param {PublicKey} publisher_verifying_key
    * @param {PublicKey} bob_verifying_key
    * @param {Conditions | null} conditions
    * @param {Context | null} context
    */
    constructor(capsules, hrac, encrypted_kfrag, publisher_verifying_key, bob_verifying_key, conditions, context) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(hrac, HRAC);
            _assertClass(encrypted_kfrag, EncryptedKeyFrag);
            _assertClass(publisher_verifying_key, PublicKey);
            _assertClass(bob_verifying_key, PublicKey);
            wasm$1.reencryptionrequest_new(retptr, addBorrowedObject(capsules), hrac.__wbg_ptr, encrypted_kfrag.__wbg_ptr, publisher_verifying_key.__wbg_ptr, bob_verifying_key.__wbg_ptr, addBorrowedObject(conditions), addBorrowedObject(context));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReencryptionRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {HRAC}
    */
    get hrac() {
        const ret = wasm$1.reencryptionrequest_hrac(this.__wbg_ptr);
        return HRAC.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    get publisherVerifyingKey() {
        const ret = wasm$1.reencryptionrequest_publisherVerifyingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    get bobVerifyingKey() {
        const ret = wasm$1.reencryptionrequest_bobVerifyingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {EncryptedKeyFrag}
    */
    get encryptedKfrag() {
        const ret = wasm$1.reencryptionrequest_encryptedKfrag(this.__wbg_ptr);
        return EncryptedKeyFrag.__wrap(ret);
    }
    /**
    * @returns {Capsule[]}
    */
    get capsules() {
        const ret = wasm$1.reencryptionrequest_capsules(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.reencryptionrequest_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Conditions | undefined}
    */
    get conditions() {
        const ret = wasm$1.reencryptionrequest_conditions(this.__wbg_ptr);
        return ret === 0 ? undefined : Conditions.__wrap(ret);
    }
    /**
    * @returns {Context | undefined}
    */
    get context() {
        const ret = wasm$1.reencryptionrequest_context(this.__wbg_ptr);
        return ret === 0 ? undefined : Context.__wrap(ret);
    }
}
/**
*/
class ReencryptionResponse {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ReencryptionResponse.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_reencryptionresponse_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ReencryptionResponse}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.reencryptionresponse_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReencryptionResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Signer} signer
    * @param {[Capsule, VerifiedCapsuleFrag][]} capsules_and_vcfrags
    */
    constructor(signer, capsules_and_vcfrags) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(signer, Signer);
            wasm$1.reencryptionresponse_new(retptr, signer.__wbg_ptr, addBorrowedObject(capsules_and_vcfrags));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReencryptionResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.reencryptionresponse_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Capsule[]} capsules
    * @param {PublicKey} alice_verifying_key
    * @param {PublicKey} ursula_verifying_key
    * @param {PublicKey} policy_encrypting_key
    * @param {PublicKey} bob_encrypting_key
    * @returns {VerifiedCapsuleFrag[]}
    */
    verify(capsules, alice_verifying_key, ursula_verifying_key, policy_encrypting_key, bob_encrypting_key) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(alice_verifying_key, PublicKey);
            _assertClass(ursula_verifying_key, PublicKey);
            _assertClass(policy_encrypting_key, PublicKey);
            _assertClass(bob_encrypting_key, PublicKey);
            wasm$1.reencryptionresponse_verify(retptr, this.__wbg_ptr, addBorrowedObject(capsules), alice_verifying_key.__wbg_ptr, ursula_verifying_key.__wbg_ptr, policy_encrypting_key.__wbg_ptr, bob_encrypting_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class RetrievalKit {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RetrievalKit.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_retrievalkit_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {RetrievalKit}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.retrievalkit_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RetrievalKit.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Capsule} capsule
    * @param {Address[]} queried_addresses
    * @param {Conditions | null} conditions
    */
    constructor(capsule, queried_addresses, conditions) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(capsule, Capsule);
            wasm$1.retrievalkit_new(retptr, capsule.__wbg_ptr, addBorrowedObject(queried_addresses), addBorrowedObject(conditions));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RetrievalKit.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {MessageKit} message_kit
    * @returns {RetrievalKit}
    */
    static fromMessageKit(message_kit) {
        _assertClass(message_kit, MessageKit);
        const ret = wasm$1.retrievalkit_fromMessageKit(message_kit.__wbg_ptr);
        return RetrievalKit.__wrap(ret);
    }
    /**
    * @returns {Capsule}
    */
    get capsule() {
        const ret = wasm$1.retrievalkit_capsule(this.__wbg_ptr);
        return Capsule.__wrap(ret);
    }
    /**
    * @returns {Address[]}
    */
    get queriedAddresses() {
        const ret = wasm$1.retrievalkit_queriedAddresses(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.retrievalkit_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Conditions | undefined}
    */
    get conditions() {
        const ret = wasm$1.retrievalkit_conditions(this.__wbg_ptr);
        return ret === 0 ? undefined : Conditions.__wrap(ret);
    }
}
/**
*/
class RevocationOrder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RevocationOrder.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_revocationorder_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {RevocationOrder}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.revocationorder_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RevocationOrder.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Signer} signer
    * @param {Address} staking_provider_address
    * @param {EncryptedKeyFrag} encrypted_kfrag
    */
    constructor(signer, staking_provider_address, encrypted_kfrag) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(signer, Signer);
            _assertClass(staking_provider_address, Address);
            _assertClass(encrypted_kfrag, EncryptedKeyFrag);
            wasm$1.revocationorder_new(retptr, signer.__wbg_ptr, staking_provider_address.__wbg_ptr, encrypted_kfrag.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RevocationOrder.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {PublicKey} alice_verifying_key
    * @returns {[Address, EncryptedKeyFrag]}
    */
    verify(alice_verifying_key) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(alice_verifying_key, PublicKey);
            wasm$1.revocationorder_verify(retptr, this.__wbg_ptr, alice_verifying_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.revocationorder_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class SecretKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SecretKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_secretkey_free(ptr);
    }
    /**
    * Generates a secret key using the default RNG and returns it.
    * @returns {SecretKey}
    */
    static random() {
        const ret = wasm$1.secretkey_random();
        return SecretKey.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBEBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.secretkey_toBEBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {SecretKey}
    */
    static fromBEBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.secretkey_fromBEBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SecretKey.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Generates a secret key using the default RNG and returns it.
    * @returns {PublicKey}
    */
    publicKey() {
        const ret = wasm$1.secretkey_publicKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.secretkey_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {SecretKey} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, SecretKey);
        const ret = wasm$1.secretkey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class SecretKeyFactory {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SecretKeyFactory.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_secretkeyfactory_free(ptr);
    }
    /**
    * Generates a secret key factory using the default RNG and returns it.
    * @returns {SecretKeyFactory}
    */
    static random() {
        const ret = wasm$1.secretkeyfactory_random();
        return SecretKeyFactory.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    static seedSize() {
        const ret = wasm$1.secretkeyfactory_seedSize();
        return ret >>> 0;
    }
    /**
    * @param {Uint8Array} seed
    * @returns {SecretKeyFactory}
    */
    static fromSecureRandomness(seed) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(seed, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.secretkeyfactory_fromSecureRandomness(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SecretKeyFactory.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} label
    * @returns {Uint8Array}
    */
    makeSecret(label) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(label, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.secretkeyfactory_makeSecret(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v2 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v2;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} label
    * @returns {SecretKey}
    */
    makeKey(label) {
        const ptr0 = passArray8ToWasm0(label, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.secretkeyfactory_makeKey(this.__wbg_ptr, ptr0, len0);
        return SecretKey.__wrap(ret);
    }
    /**
    * @param {Uint8Array} label
    * @returns {SecretKeyFactory}
    */
    makeFactory(label) {
        const ptr0 = passArray8ToWasm0(label, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.secretkeyfactory_makeFactory(this.__wbg_ptr, ptr0, len0);
        return SecretKeyFactory.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.secretkeyfactory_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
class SessionSecretFactory {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SessionSecretFactory.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_sessionsecretfactory_free(ptr);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.sessionsecretfactory_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Generates a secret key factory using the default RNG and returns it.
    * @returns {SessionSecretFactory}
    */
    static random() {
        const ret = wasm$1.sessionsecretfactory_random();
        return SessionSecretFactory.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    static seedSize() {
        const ret = wasm$1.sessionsecretfactory_seedSize();
        return ret >>> 0;
    }
    /**
    * @param {Uint8Array} seed
    * @returns {SessionSecretFactory}
    */
    static fromSecureRandomness(seed) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(seed, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.sessionsecretfactory_fromSecureRandomness(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SessionSecretFactory.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} label
    * @returns {SessionStaticSecret}
    */
    makeKey(label) {
        const ptr0 = passArray8ToWasm0(label, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.sessionsecretfactory_makeKey(this.__wbg_ptr, ptr0, len0);
        return SessionStaticSecret.__wrap(ret);
    }
}
/**
*/
class SessionSharedSecret {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SessionSharedSecret.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_sessionsharedsecret_free(ptr);
    }
}
/**
*/
class SessionStaticKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SessionStaticKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_sessionstatickey_free(ptr);
    }
    /**
    * @param {SessionStaticKey} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, SessionStaticKey);
        const ret = wasm$1.sessionstatickey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {SessionStaticKey}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.sessionstatickey_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SessionStaticKey.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.sessionstatickey_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.sessionstatickey_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class SessionStaticSecret {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SessionStaticSecret.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_sessionstaticsecret_free(ptr);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.sessionstaticsecret_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Generates a secret key using the default RNG and returns it.
    * @returns {SessionStaticSecret}
    */
    static random() {
        const ret = wasm$1.sessionstaticsecret_random();
        return SessionStaticSecret.__wrap(ret);
    }
    /**
    * Generates a secret key using the default RNG and returns it.
    * @returns {SessionStaticKey}
    */
    publicKey() {
        const ret = wasm$1.sessionstaticsecret_publicKey(this.__wbg_ptr);
        return SessionStaticKey.__wrap(ret);
    }
    /**
    * @param {SessionStaticKey} their_public_key
    * @returns {SessionSharedSecret}
    */
    deriveSharedSecret(their_public_key) {
        _assertClass(their_public_key, SessionStaticKey);
        const ret = wasm$1.sessionstaticsecret_deriveSharedSecret(this.__wbg_ptr, their_public_key.__wbg_ptr);
        return SessionSharedSecret.__wrap(ret);
    }
}
/**
*/
class SharedSecret {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SharedSecret.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_sharedsecret_free(ptr);
    }
    /**
    * @param {SharedSecret} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, SharedSecret);
        const ret = wasm$1.sharedsecret_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {SharedSecret}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.sharedsecret_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SharedSecret.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.sharedsecret_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class Signature {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Signature.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_signature_free(ptr);
    }
    /**
    * @param {PublicKey} verifying_pk
    * @param {Uint8Array} message
    * @returns {boolean}
    */
    verify(verifying_pk, message) {
        _assertClass(verifying_pk, PublicKey);
        const ptr0 = passArray8ToWasm0(message, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.signature_verify(this.__wbg_ptr, verifying_pk.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @returns {Uint8Array}
    */
    toDerBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.signature_toDerBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {Signature}
    */
    static fromDerBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.signature_fromDerBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Signature.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBEBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.signature_toBEBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} data
    * @returns {Signature}
    */
    static fromBEBytes(data) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.signature_fromBEBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Signature.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.signature_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Signature} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Signature);
        const ret = wasm$1.signature_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class Signer {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Signer.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_signer_free(ptr);
    }
    /**
    * @param {SecretKey} secret_key
    */
    constructor(secret_key) {
        _assertClass(secret_key, SecretKey);
        const ret = wasm$1.signer_new(secret_key.__wbg_ptr);
        return Signer.__wrap(ret);
    }
    /**
    * @param {Uint8Array} message
    * @returns {Signature}
    */
    sign(message) {
        const ptr0 = passArray8ToWasm0(message, wasm$1.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.signer_sign(this.__wbg_ptr, ptr0, len0);
        return Signature.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    verifyingKey() {
        const ret = wasm$1.signer_verifyingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.signer_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
class ThresholdDecryptionRequest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ThresholdDecryptionRequest.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_thresholddecryptionrequest_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ThresholdDecryptionRequest}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.thresholddecryptionrequest_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdDecryptionRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.thresholddecryptionrequest_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ThresholdDecryptionRequest} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, ThresholdDecryptionRequest);
        const ret = wasm$1.thresholddecryptionrequest_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {number} ritual_id
    * @param {FerveoVariant} variant
    * @param {CiphertextHeader} ciphertext_header
    * @param {AccessControlPolicy} acp
    * @param {Context | null} context
    */
    constructor(ritual_id, variant, ciphertext_header, acp, context) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(variant, FerveoVariant);
            _assertClass(ciphertext_header, CiphertextHeader);
            _assertClass(acp, AccessControlPolicy);
            wasm$1.thresholddecryptionrequest_new(retptr, ritual_id, variant.__wbg_ptr, ciphertext_header.__wbg_ptr, acp.__wbg_ptr, addBorrowedObject(context));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdDecryptionRequest.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {number}
    */
    get ritualId() {
        const ret = wasm$1.thresholddecryptionrequest_ritualId(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {FerveoVariant}
    */
    get variant() {
        const ret = wasm$1.thresholddecryptionrequest_variant(this.__wbg_ptr);
        return FerveoVariant.__wrap(ret);
    }
    /**
    * @returns {CiphertextHeader}
    */
    get ciphertextHeader() {
        const ret = wasm$1.thresholddecryptionrequest_ciphertextHeader(this.__wbg_ptr);
        return CiphertextHeader.__wrap(ret);
    }
    /**
    * @returns {AccessControlPolicy}
    */
    get acp() {
        const ret = wasm$1.thresholddecryptionrequest_acp(this.__wbg_ptr);
        return AccessControlPolicy.__wrap(ret);
    }
    /**
    * @param {SessionSharedSecret} shared_secret
    * @param {SessionStaticKey} requester_public_key
    * @returns {EncryptedThresholdDecryptionRequest}
    */
    encrypt(shared_secret, requester_public_key) {
        _assertClass(shared_secret, SessionSharedSecret);
        _assertClass(requester_public_key, SessionStaticKey);
        const ret = wasm$1.thresholddecryptionrequest_encrypt(this.__wbg_ptr, shared_secret.__wbg_ptr, requester_public_key.__wbg_ptr);
        return EncryptedThresholdDecryptionRequest.__wrap(ret);
    }
}
/**
*/
class ThresholdDecryptionResponse {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ThresholdDecryptionResponse.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_thresholddecryptionresponse_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ThresholdDecryptionResponse}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.thresholddecryptionresponse_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdDecryptionResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.thresholddecryptionresponse_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} ritual_id
    * @param {Uint8Array} decryption_share
    */
    constructor(ritual_id, decryption_share) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(decryption_share, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.thresholddecryptionresponse_new(retptr, ritual_id, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdDecryptionResponse.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    get ritualId() {
        const ret = wasm$1.encryptedthresholddecryptionrequest_ritualId(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Uint8Array}
    */
    get decryptionShare() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.thresholddecryptionresponse_decryptionShare(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {SessionSharedSecret} shared_secret
    * @returns {EncryptedThresholdDecryptionResponse}
    */
    encrypt(shared_secret) {
        _assertClass(shared_secret, SessionSharedSecret);
        const ret = wasm$1.thresholddecryptionresponse_encrypt(this.__wbg_ptr, shared_secret.__wbg_ptr);
        return EncryptedThresholdDecryptionResponse.__wrap(ret);
    }
}
/**
*/
class ThresholdMessageKit {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ThresholdMessageKit.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_thresholdmessagekit_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ThresholdMessageKit}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.thresholdmessagekit_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ThresholdMessageKit.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.thresholdmessagekit_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ThresholdMessageKit} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, ThresholdMessageKit);
        const ret = wasm$1.thresholdmessagekit_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Ciphertext} ciphertext
    * @param {AccessControlPolicy} acp
    */
    constructor(ciphertext, acp) {
        _assertClass(ciphertext, Ciphertext);
        _assertClass(acp, AccessControlPolicy);
        const ret = wasm$1.thresholdmessagekit_new(ciphertext.__wbg_ptr, acp.__wbg_ptr);
        return ThresholdMessageKit.__wrap(ret);
    }
    /**
    * @returns {CiphertextHeader}
    */
    get ciphertextHeader() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.thresholdmessagekit_ciphertextHeader(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CiphertextHeader.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {AccessControlPolicy}
    */
    get acp() {
        const ret = wasm$1.thresholdmessagekit_acp(this.__wbg_ptr);
        return AccessControlPolicy.__wrap(ret);
    }
    /**
    * @param {SharedSecret} shared_secret
    * @returns {Uint8Array}
    */
    decryptWithSharedSecret(shared_secret) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(shared_secret, SharedSecret);
            wasm$1.thresholdmessagekit_decryptWithSharedSecret(retptr, this.__wbg_ptr, shared_secret.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class Transcript {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transcript.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_transcript_free(ptr);
    }
    /**
    * @param {Transcript} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, Transcript);
        const ret = wasm$1.aggregatedtranscript_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Transcript}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.transcript_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transcript.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.transcript_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class TreasureMap {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TreasureMap.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_treasuremap_free(ptr);
    }
    /**
    * @param {TreasureMap} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, TreasureMap);
        const ret = wasm$1.treasuremap_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {TreasureMap}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm$1.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm$1.treasuremap_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TreasureMap.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Signer} signer
    * @param {HRAC} hrac
    * @param {PublicKey} policy_encrypting_key
    * @param {[Address, [PublicKey, VerifiedKeyFrag]][]} assigned_kfrags
    * @param {number} threshold
    */
    constructor(signer, hrac, policy_encrypting_key, assigned_kfrags, threshold) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(signer, Signer);
            _assertClass(hrac, HRAC);
            _assertClass(policy_encrypting_key, PublicKey);
            wasm$1.treasuremap_new(retptr, signer.__wbg_ptr, hrac.__wbg_ptr, policy_encrypting_key.__wbg_ptr, addBorrowedObject(assigned_kfrags), threshold);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TreasureMap.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {Signer} signer
    * @param {PublicKey} recipient_key
    * @returns {EncryptedTreasureMap}
    */
    encrypt(signer, recipient_key) {
        _assertClass(signer, Signer);
        _assertClass(recipient_key, PublicKey);
        const ret = wasm$1.treasuremap_encrypt(this.__wbg_ptr, signer.__wbg_ptr, recipient_key.__wbg_ptr);
        return EncryptedTreasureMap.__wrap(ret);
    }
    /**
    * @returns {[Address, EncryptedKeyFrag][]}
    */
    get destinations() {
        const ret = wasm$1.treasuremap_destinations(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {Signer} signer
    * @returns {RevocationOrder | null}
    */
    makeRevocationOrders(signer) {
        _assertClass(signer, Signer);
        const ret = wasm$1.treasuremap_makeRevocationOrders(this.__wbg_ptr, signer.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {HRAC}
    */
    get hrac() {
        const ret = wasm$1.treasuremap_hrac(this.__wbg_ptr);
        return HRAC.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    get threshold() {
        const ret = wasm$1.treasuremap_threshold(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {PublicKey}
    */
    get policyEncryptingKey() {
        const ret = wasm$1.treasuremap_policyEncryptingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    get publisherVerifyingKey() {
        const ret = wasm$1.treasuremap_publisherVerifyingKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.treasuremap_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class Validator {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Validator.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_validator_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.validator___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {EthereumAddress} address
    * @param {FerveoPublicKey} public_key
    */
    constructor(address, public_key) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(address, EthereumAddress);
            _assertClass(public_key, FerveoPublicKey);
            wasm$1.validator_new(retptr, address.__wbg_ptr, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Validator.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FerveoPublicKey}
    */
    get publicKey() {
        const ret = wasm$1.validator_publicKey(this.__wbg_ptr);
        return FerveoPublicKey.__wrap(ret);
    }
    /**
    * @returns {EthereumAddress}
    */
    get address() {
        const ret = wasm$1.validator_address(this.__wbg_ptr);
        return EthereumAddress.__wrap(ret);
    }
}
/**
*/
class ValidatorMessage {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ValidatorMessage.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_validatormessage_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.validatormessage___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Validator} validator
    * @param {Transcript} transcript
    */
    constructor(validator, transcript) {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(validator, Validator);
            _assertClass(transcript, Transcript);
            wasm$1.validatormessage_new(retptr, validator.__wbg_ptr, transcript.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ValidatorMessage.__wrap(r0);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Validator}
    */
    get validator() {
        const ret = wasm$1.validatormessage_validator(this.__wbg_ptr);
        return Validator.__wrap(ret);
    }
    /**
    * @returns {Transcript}
    */
    get transcript() {
        const ret = wasm$1.validatormessage_transcript(this.__wbg_ptr);
        return Transcript.__wrap(ret);
    }
}
/**
*/
class VerifiedCapsuleFrag {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifiedCapsuleFrag.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_verifiedcapsulefrag_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.verifiedcapsulefrag___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {CapsuleFrag}
    */
    unverify() {
        const ret = wasm$1.capsulefrag_skipVerification(this.__wbg_ptr);
        return CapsuleFrag.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsulefrag_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytesSimple() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.capsulefrag_toBytesSimple(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.verifiedcapsulefrag_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {VerifiedCapsuleFrag} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, VerifiedCapsuleFrag);
        const ret = wasm$1.capsulefrag_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class VerifiedKeyFrag {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifiedKeyFrag.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm$1.__wbg_verifiedkeyfrag_free(ptr);
    }
    /**
    * @returns {string}
    */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.verifiedkeyfrag___getClassname(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.keyfrag_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm$1.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
            wasm$1.verifiedkeyfrag_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm$1.__wbindgen_add_to_stack_pointer(16);
            wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {VerifiedKeyFrag} other
    * @returns {boolean}
    */
    equals(other) {
        _assertClass(other, VerifiedKeyFrag);
        const ret = wasm$1.keyfrag_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_address_new = function(arg0) {
        const ret = Address.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_encryptedkeyfrag_new = function(arg0) {
        const ret = EncryptedKeyFrag.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = getObject(arg0) === null;
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_authenticateddata_new = function(arg0) {
        const ret = AuthenticatedData.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_nodemetadata_new = function(arg0) {
        const ret = NodeMetadata.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_revocationorder_new = function(arg0) {
        const ret = RevocationOrder.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_capsule_new = function(arg0) {
        const ret = Capsule.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_verifiedcapsulefrag_new = function(arg0) {
        const ret = VerifiedCapsuleFrag.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_verifiedkeyfrag_new = function(arg0) {
        const ret = VerifiedKeyFrag.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_ciphertext_new = function(arg0) {
        const ret = Ciphertext.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_crypto_c48a774b022d20ac = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_process_298734cf255a885d = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_e2e78e134e3e5d01 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_1cd7a5d853dbea79 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_8f08ceecec0f4fee = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_get_44be0491f933a435 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_fff51ee6522a1a18 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_898a68150f225f2e = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_581967eacc0e2604 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_97b561fb56f034b5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_cb65541d95d71282 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_1ff1d729e9aae938 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_5f4faef6c12b79ec = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_1d39714405582d3c = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_651f05c6a0944d1c = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_isArray_4c24b343cb13cfb1 = function(arg0) {
        const ret = Array.isArray(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_push_ca1c26067ef907ac = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_new_d258248ed531ff54 = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_01734de55d61e11d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_buffer_085ec1f694018c4f = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8125e318e6245eed = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_5cf90238115182c3 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_13db269f57aa838d = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_apply_f9ecfcbfefaf7349 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.apply(getObject(arg0), getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm$1.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm$1 = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm$1;
}

function initSync(module) {
    if (wasm$1 !== undefined) return wasm$1;

    const imports = __wbg_get_imports();

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm$1 !== undefined) return wasm$1;

    if (typeof input === 'undefined') {
        input = new URL('nucypher_core_wasm_bg.wasm', "");
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

let wasmInit = undefined;
const setWasmInit = (arg) => {
    wasmInit = arg;
};
let initialized = undefined;
const initialize = async (wasm) => {
    if (initialized === undefined) {
        //@ts-ignore
        const loadModule = wasm !== null && wasm !== void 0 ? wasm : wasmInit();
        initialized = __wbg_init(loadModule).then(() => void 0);
    }
    await initialized;
};

function _loadWasmModule (sync, filepath, src, imports) {
  function _instantiateOrCompile(source, imports, stream) {
    var instantiateFunc = stream ? WebAssembly.instantiateStreaming : WebAssembly.instantiate;
    var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

    if (imports) {
      return instantiateFunc(source, imports)
    } else {
      return compileFunc(source)
    }
  }

  
var buf = null;
if (filepath) {
  
var fs = require("fs");
var path = require("path");

return new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, filepath), (error, buffer) => {
    if (error != null) {
      reject(error);
    } else {
      resolve(_instantiateOrCompile(buffer, imports, false));
    }
  });
});

}


buf = Buffer.from(src, 'base64');



  if(sync) {
    var mod = new WebAssembly.Module(buf);
    return imports ? new WebAssembly.Instance(mod, imports) : mod
  } else {
    return _instantiateOrCompile(buf, imports, false)
  }
}

function wasm(imports){return _loadWasmModule(0, '../nucypher_core_wasm_bg.wasm', null, imports)}

// @ts-ignore
setWasmInit(() => wasm());

// Fixes Node.js ES module support
// See: https://docs.rs/getrandom/latest/getrandom/#nodejs-es-module-support
// @ts-ignore
globalThis.crypto = node_crypto.webcrypto;

exports.AccessControlPolicy = AccessControlPolicy;
exports.Address = Address;
exports.AggregatedTranscript = AggregatedTranscript;
exports.AuthenticatedData = AuthenticatedData;
exports.Capsule = Capsule;
exports.CapsuleFrag = CapsuleFrag;
exports.Ciphertext = Ciphertext;
exports.CiphertextHeader = CiphertextHeader;
exports.Conditions = Conditions;
exports.Context = Context;
exports.CurvePoint = CurvePoint;
exports.DecryptionSharePrecomputed = DecryptionSharePrecomputed;
exports.DecryptionShareSimple = DecryptionShareSimple;
exports.Dkg = Dkg;
exports.DkgPublicKey = DkgPublicKey;
exports.EncryptedKeyFrag = EncryptedKeyFrag;
exports.EncryptedThresholdDecryptionRequest = EncryptedThresholdDecryptionRequest;
exports.EncryptedThresholdDecryptionResponse = EncryptedThresholdDecryptionResponse;
exports.EncryptedTreasureMap = EncryptedTreasureMap;
exports.EthereumAddress = EthereumAddress;
exports.FerveoPublicKey = FerveoPublicKey;
exports.FerveoVariant = FerveoVariant;
exports.FleetStateChecksum = FleetStateChecksum;
exports.HRAC = HRAC;
exports.KeyFrag = KeyFrag;
exports.Keypair = Keypair;
exports.MessageKit = MessageKit;
exports.MetadataRequest = MetadataRequest;
exports.MetadataResponse = MetadataResponse;
exports.MetadataResponsePayload = MetadataResponsePayload;
exports.NodeMetadata = NodeMetadata;
exports.NodeMetadataPayload = NodeMetadataPayload;
exports.Parameters = Parameters;
exports.PublicKey = PublicKey;
exports.RecoverableSignature = RecoverableSignature;
exports.ReencryptionEvidence = ReencryptionEvidence;
exports.ReencryptionRequest = ReencryptionRequest;
exports.ReencryptionResponse = ReencryptionResponse;
exports.RetrievalKit = RetrievalKit;
exports.RevocationOrder = RevocationOrder;
exports.SecretKey = SecretKey;
exports.SecretKeyFactory = SecretKeyFactory;
exports.SessionSecretFactory = SessionSecretFactory;
exports.SessionSharedSecret = SessionSharedSecret;
exports.SessionStaticKey = SessionStaticKey;
exports.SessionStaticSecret = SessionStaticSecret;
exports.SharedSecret = SharedSecret;
exports.Signature = Signature;
exports.Signer = Signer;
exports.ThresholdDecryptionRequest = ThresholdDecryptionRequest;
exports.ThresholdDecryptionResponse = ThresholdDecryptionResponse;
exports.ThresholdMessageKit = ThresholdMessageKit;
exports.Transcript = Transcript;
exports.TreasureMap = TreasureMap;
exports.Validator = Validator;
exports.ValidatorMessage = ValidatorMessage;
exports.VerifiedCapsuleFrag = VerifiedCapsuleFrag;
exports.VerifiedKeyFrag = VerifiedKeyFrag;
exports.combineDecryptionSharesPrecomputed = combineDecryptionSharesPrecomputed;
exports.combineDecryptionSharesSimple = combineDecryptionSharesSimple;
exports.decryptOriginal = decryptOriginal;
exports.decryptReencrypted = decryptReencrypted;
exports.decryptWithSharedSecret = decryptWithSharedSecret;
exports.encrypt = encrypt;
exports.encryptForDkg = encryptForDkg;
exports.ferveoEncrypt = ferveoEncrypt;
exports.generateKFrags = generateKFrags;
exports.initSync = initSync;
exports.initialize = initialize;
exports.reencrypt = reencrypt;
exports.setWasmInit = setWasmInit;
