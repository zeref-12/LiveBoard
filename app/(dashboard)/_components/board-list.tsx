"use client"

import { useQuery } from "convex/react";
import { EmptyBaords } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySeach } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";


interface BoardListProps{
    orgId: string,
    query: {
        search?: string;
        favorites?: string;
    };
};

export const BoardList = ({
    orgId,
    query,
}: BoardListProps) => {
    const data = useQuery(api.boards.get,{orgId,...query,});
    if(data === undefined){
        return(
            <div>
                <h2 className="text-3xl">
                    {query.favorites ? "Favotite boards" : "Team Boards"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton orgId={orgId} disabled/>
                    
                </div>
            </div>
        )
    }


    if(!data?.length && query.search){
        return (
            <div>
                <EmptySeach/>
            </div>
        );
    }
    if(!data?.length && query.favorites){
        return (
            <div>
                <EmptyFavorites/>
            </div>
        );
    }
    if(!data?.length){
        return (
            <div>
                <EmptyBaords/>
            </div>
        );
    }
    return (
        <div>
          <h2 className="text-3xl">
            {query.favorites ? "Favorite boards" : "Team Boards"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
            <NewBoardButton orgId = {orgId} />
            {data?.map((board) => (
                <BoardCard
                  key = {board._id}
                  id = {board._id}
                  title = {board.title}
                  imageUrl = {board.imageUrl}
                  authorId = {board.authorId}
                  createdAt={board._creationTime}
                  authorName = {board.authorName}
                  orgId = {board.orgId}
                  isFavorite = {board.isFavorite}
                />
            ))}
          </div>
        </div>
    )
}