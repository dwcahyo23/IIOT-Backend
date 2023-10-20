import QuestDB from '../controllers/QuestDB'

export default (app) => {
    app.post('/query', QuestDB.getQuery)
}
