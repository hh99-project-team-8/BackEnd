import { prisma } from "../utils/prisma/index.js";

export class LikeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /* 프로젝트 id  */
  findProjectById = async (projectId) => {
    //projects
    //console.log("!!!!!!!!!!!!!!",projectId) 프로젝트 아이디 제대로 5 나옴
    const like = await this.prisma.likes.findFirst({
      where: { id: +projectId },
    });

    return like;
  };

  /* like 유저 id */
  // like 대소문자 다시확인
  getLikeById = async (userId) => {
    //console.log("@@@@@@@@@@",userId)       // 유저 아이디 1로 나옴
    // _count 필드 출력
    const project = await this.prisma.projects.findMany({
      where: {
        likes: {
          some: {
            id: +userId,
          },
        },
      },

      select: {
        id: true,
        title: true,
        //thumbnail: true,
        category: true,
        //viewCount: true,
        //likeCount: true,
        //isBookmarked: true,
        // isLiked: true,
        createdAt: true,
        users: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return project;
  };

  /* 좋아요 / 좋아요 취소 */

  // console.log("$$$$$$$$$$",projectId) // 7
  // console.log("%%%%%%%%%%%",userId)   // 2로 정상
  //Unknown nested field '_count' for operation findManyLikes does not match any query. 오류

  isLike = async (projectId, userId) => {
    //console.log("@@@@@",isLike)
    //console.log("$$$$$$$$$$",projectId)
    const like = await this.prisma.likes.findFirst({
      where: { projectId: +projectId, userId: +userId },
    });
    console.log("@@@@@@",like)
    return like;
  };

  addLike = async (projectId, userId) => {
    const like = await this.prisma.likes.create({
      data: { projectId: +projectId, userId: +userId },
    });
    return like;
  };

  // 문제인 부분 : likeId 를 찾을수가없음

  deleteLike = async (likeId) => {
    const like = await this.prisma.likes.delete({
      where: { id: +likeId },
    });

    return like;
  };

  // deleteLike = async (likeId) => {
  //     // console.log(typeof likeId)
  //     await prisma.likes.delete({
  //       where: { id: +likeId },
  //     });
  //   };
}