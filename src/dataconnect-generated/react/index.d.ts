import { GetMyNotesData, CreateNoteData, CreateNoteVariables, GetAllTagsData, CreateTagData, CreateTagVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetMyNotes(options?: useDataConnectQueryOptions<GetMyNotesData>): UseDataConnectQueryResult<GetMyNotesData, undefined>;
export function useGetMyNotes(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyNotesData>): UseDataConnectQueryResult<GetMyNotesData, undefined>;

export function useCreateNote(options?: useDataConnectMutationOptions<CreateNoteData, FirebaseError, CreateNoteVariables>): UseDataConnectMutationResult<CreateNoteData, CreateNoteVariables>;
export function useCreateNote(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNoteData, FirebaseError, CreateNoteVariables>): UseDataConnectMutationResult<CreateNoteData, CreateNoteVariables>;

export function useGetAllTags(options?: useDataConnectQueryOptions<GetAllTagsData>): UseDataConnectQueryResult<GetAllTagsData, undefined>;
export function useGetAllTags(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllTagsData>): UseDataConnectQueryResult<GetAllTagsData, undefined>;

export function useCreateTag(options?: useDataConnectMutationOptions<CreateTagData, FirebaseError, CreateTagVariables>): UseDataConnectMutationResult<CreateTagData, CreateTagVariables>;
export function useCreateTag(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTagData, FirebaseError, CreateTagVariables>): UseDataConnectMutationResult<CreateTagData, CreateTagVariables>;
