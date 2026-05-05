import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNoteData {
  note_insert: Note_Key;
}

export interface CreateNoteVariables {
  title: string;
  content: string;
  isFavorite?: boolean | null;
}

export interface CreateTagData {
  tag_insert: Tag_Key;
}

export interface CreateTagVariables {
  name: string;
  description?: string | null;
}

export interface GetAllTagsData {
  tags: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Tag_Key)[];
}

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

export interface NoteTag_Key {
  noteId: UUIDString;
  tagId: UUIDString;
  __typename?: 'NoteTag_Key';
}

export interface Note_Key {
  id: UUIDString;
  __typename?: 'Note_Key';
}

export interface Tag_Key {
  id: UUIDString;
  __typename?: 'Tag_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface GetMyNotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyNotesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyNotesData, undefined>;
  operationName: string;
}
export const getMyNotesRef: GetMyNotesRef;

export function getMyNotes(options?: ExecuteQueryOptions): QueryPromise<GetMyNotesData, undefined>;
export function getMyNotes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyNotesData, undefined>;

interface CreateNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
  operationName: string;
}
export const createNoteRef: CreateNoteRef;

export function createNote(vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;
export function createNote(dc: DataConnect, vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface GetAllTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllTagsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllTagsData, undefined>;
  operationName: string;
}
export const getAllTagsRef: GetAllTagsRef;

export function getAllTags(options?: ExecuteQueryOptions): QueryPromise<GetAllTagsData, undefined>;
export function getAllTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllTagsData, undefined>;

interface CreateTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
  operationName: string;
}
export const createTagRef: CreateTagRef;

export function createTag(vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;
export function createTag(dc: DataConnect, vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

