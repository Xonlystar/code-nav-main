import type { Request, Response } from 'express'
import getUser from './getUser.json'
import doDailyLogin from './doDailyLogin.json'
import countMyMessages from './countMyMessages.json'
import listUserTotalRank from './listUserTotalRank.json'
import listUserCycleRank from './listUserCycleRank.json'
import getTags from './getTags.json'
import listRecommendResources from './listRecommendResources.json'
import searchUserIntroduces from './searchUserIntroduces.json'
import searchMessages from './searchMessages.json'
import getUserRank from './getUserRank.json'
import searchComments from './searchComments.json'
import getSimpleUser from './getSimpleUser.json'
import viewResource from './viewResource.json'
import searchUserScores from './searchUserScores.json'
import searchInviteRecords from './searchInviteRecords.json'
import searchWishes from './searchWishes.json'
import updateUser from './updateUser.json'
import addShareNum from './addShareNum.json'
import likeResource from './likeResource.json'

import wsWebSign from './wsWebSign.json'
import queryDocument from './queryDocument.json'
import queryWish from './queryWish.json'
import queryDiscuss from './queryDiscuss.json'
import queryDocumentList from './queryDocumentList.json'
import countDocument from './countDocument.json'
import login from './login.json'
import searchResourcesByPage from './searchResourcesByPage.json'
import getResource from './getResource.json'
import searchResources from './searchResources.json'

/**
 * MOCK 开关
 */
export const MOCK_OPEN = true

/**
 * Mock 数据
 */
export const mockData = {
  'auth.wsWebSign': wsWebSign,
  'database.queryWish': queryWish,
  'database.queryDiscuss': queryDiscuss,
  'database.queryDocument': queryDocument,
  'database.queryDocumentList': queryDocumentList,
  'database.countDocument': countDocument,
  'custom.login': login,
  'database.searchResourcesByPage': searchResourcesByPage,
  'document.getResource': getResource,
  '404': {},
  'list.empty': {
    total: 100,
    data: []
  }
}

export default {
  'POST /test/getUser': (req: Request, res: Response) => res.json(getUser),
  'POST /test/doDailyLogin': (req: Request, res: Response) => res.json(doDailyLogin),
  'POST /test/countMyMessages': (req: Request, res: Response) => res.json(countMyMessages),
  'POST /test/listUserTotalRank': (req: Request, res: Response) => res.json(listUserTotalRank),
  'POST /test/listUserCycleRank': (req: Request, res: Response) => res.json(listUserCycleRank),
  'POST /test/getTags': (req: Request, res: Response) => res.json(getTags),
  'POST /test/listRecommendResources': (req: Request, res: Response) => res.json(listRecommendResources),
  'POST /test/searchUserIntroduces': (req: Request, res: Response) => res.json(searchUserIntroduces),
  'POST /test/searchMessages': (req: Request, res: Response) => res.json(searchMessages),
  'POST /test/getUserRank': (req: Request, res: Response) => res.json(getUserRank),
  'POST /test/searchComments': (req: Request, res: Response) => res.json(searchComments),
  'POST /test/getSimpleUser': (req: Request, res: Response) => res.json(getSimpleUser),
  'POST /test/viewResource': (req: Request, res: Response) => res.json(viewResource),
  'POST /test/searchUserScores': (req: Request, res: Response) => res.json(searchUserScores),
  'POST /test/searchInviteRecords': (req: Request, res: Response) => res.json(searchInviteRecords),
  'POST /test/searchWishes': (req: Request, res: Response) => res.json(searchWishes),
  'POST /test/updateUser': (req: Request, res: Response) => res.json(updateUser),
  'POST /test/searchResources': (req: Request, res: Response) => res.json(searchResources),
  'POST /test/addShareNum': (req: Request, res: Response) => res.json(addShareNum),
  'POST /test/likeResource': (req: Request, res: Response) => res.json(likeResource)
}
