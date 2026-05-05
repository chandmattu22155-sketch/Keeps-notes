# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyNotes*](#getmynotes)
  - [*GetAllTags*](#getalltags)
- [**Mutations**](#mutations)
  - [*CreateNote*](#createnote)
  - [*CreateTag*](#createtag)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyNotes
You can execute the `GetMyNotes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyNotes(options?: ExecuteQueryOptions): QueryPromise<GetMyNotesData, undefined>;

interface GetMyNotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyNotesData, undefined>;
}
export const getMyNotesRef: GetMyNotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyNotes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyNotesData, undefined>;

interface GetMyNotesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyNotesData, undefined>;
}
export const getMyNotesRef: GetMyNotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyNotesRef:
```typescript
const name = getMyNotesRef.operationName;
console.log(name);
```

### Variables
The `GetMyNotes` query has no variables.
### Return Type
Recall that executing the `GetMyNotes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyNotesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyNotesData {
  notes: ({
    id: UUIDString;
    title: string;
    content: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    isFavorite?: boolean | null;
    author?: {
      displayName: string;
      email: string;
    };
      tags_via_NoteTag: ({
        id: UUIDString;
        name: string;
      } & Tag_Key)[];
  } & Note_Key)[];
}
```
### Using `GetMyNotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyNotes } from '@dataconnect/generated';


// Call the `getMyNotes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyNotes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyNotes(dataConnect);

console.log(data.notes);

// Or, you can use the `Promise` API.
getMyNotes().then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

### Using `GetMyNotes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyNotesRef } from '@dataconnect/generated';


// Call the `getMyNotesRef()` function to get a reference to the query.
const ref = getMyNotesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyNotesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

## GetAllTags
You can execute the `GetAllTags` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllTags(options?: ExecuteQueryOptions): QueryPromise<GetAllTagsData, undefined>;

interface GetAllTagsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllTagsData, undefined>;
}
export const getAllTagsRef: GetAllTagsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllTagsData, undefined>;

interface GetAllTagsRef {
  ...
  (dc: DataConnect): QueryRef<GetAllTagsData, undefined>;
}
export const getAllTagsRef: GetAllTagsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllTagsRef:
```typescript
const name = getAllTagsRef.operationName;
console.log(name);
```

### Variables
The `GetAllTags` query has no variables.
### Return Type
Recall that executing the `GetAllTags` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllTagsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAllTagsData {
  tags: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Tag_Key)[];
}
```
### Using `GetAllTags`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllTags } from '@dataconnect/generated';


// Call the `getAllTags()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllTags();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllTags(dataConnect);

console.log(data.tags);

// Or, you can use the `Promise` API.
getAllTags().then((response) => {
  const data = response.data;
  console.log(data.tags);
});
```

### Using `GetAllTags`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllTagsRef } from '@dataconnect/generated';


// Call the `getAllTagsRef()` function to get a reference to the query.
const ref = getAllTagsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllTagsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tags);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tags);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNote
You can execute the `CreateNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNote(vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface CreateNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
}
export const createNoteRef: CreateNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNote(dc: DataConnect, vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface CreateNoteRef {
  ...
  (dc: DataConnect, vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
}
export const createNoteRef: CreateNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNoteRef:
```typescript
const name = createNoteRef.operationName;
console.log(name);
```

### Variables
The `CreateNote` mutation requires an argument of type `CreateNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNoteVariables {
  title: string;
  content: string;
  isFavorite?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNoteData {
  note_insert: Note_Key;
}
```
### Using `CreateNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNote, CreateNoteVariables } from '@dataconnect/generated';

// The `CreateNote` mutation requires an argument of type `CreateNoteVariables`:
const createNoteVars: CreateNoteVariables = {
  title: ..., 
  content: ..., 
  isFavorite: ..., // optional
};

// Call the `createNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNote(createNoteVars);
// Variables can be defined inline as well.
const { data } = await createNote({ title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNote(dataConnect, createNoteVars);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
createNote(createNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

### Using `CreateNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNoteRef, CreateNoteVariables } from '@dataconnect/generated';

// The `CreateNote` mutation requires an argument of type `CreateNoteVariables`:
const createNoteVars: CreateNoteVariables = {
  title: ..., 
  content: ..., 
  isFavorite: ..., // optional
};

// Call the `createNoteRef()` function to get a reference to the mutation.
const ref = createNoteRef(createNoteVars);
// Variables can be defined inline as well.
const ref = createNoteRef({ title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNoteRef(dataConnect, createNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

## CreateTag
You can execute the `CreateTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTag(vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface CreateTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
}
export const createTagRef: CreateTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTag(dc: DataConnect, vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface CreateTagRef {
  ...
  (dc: DataConnect, vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
}
export const createTagRef: CreateTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTagRef:
```typescript
const name = createTagRef.operationName;
console.log(name);
```

### Variables
The `CreateTag` mutation requires an argument of type `CreateTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTagVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTagData {
  tag_insert: Tag_Key;
}
```
### Using `CreateTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTag, CreateTagVariables } from '@dataconnect/generated';

// The `CreateTag` mutation requires an argument of type `CreateTagVariables`:
const createTagVars: CreateTagVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `createTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTag(createTagVars);
// Variables can be defined inline as well.
const { data } = await createTag({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTag(dataConnect, createTagVars);

console.log(data.tag_insert);

// Or, you can use the `Promise` API.
createTag(createTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_insert);
});
```

### Using `CreateTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTagRef, CreateTagVariables } from '@dataconnect/generated';

// The `CreateTag` mutation requires an argument of type `CreateTagVariables`:
const createTagVars: CreateTagVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `createTagRef()` function to get a reference to the mutation.
const ref = createTagRef(createTagVars);
// Variables can be defined inline as well.
const ref = createTagRef({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTagRef(dataConnect, createTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_insert);
});
```

