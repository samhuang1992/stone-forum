const { Stone, User, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getRestaurants: (req, res, next) => {
    Stone.findAll({
      // 整理資料
      raw: true
      // nest: true,
      // include: [Category]
    })
      .then(restaurants => res.render('events', { restaurants }))
      .catch(err => next(err))
  },
  createRestaurant: (req, res) => {
    return res.render('create-event')
  },
  postRestaurant: (req, res, next) => {
    // 結構賦值
    const { name, address, date, description, party } = req.body
    // name 是必填，若發先是空值就會終止程式碼，並在畫面顯示錯誤提示
    if (!name) throw new Error('Event name is required!')
    // 產生一個新的 Restaurant 物件實例，並存入資料庫
    const { file } = req
    localFileHandler(file)
      .then(filePath => Stone.create({
          name,
          address,
          date,
          description,
          image: filePath || null,
          party
        }))
      .then(() => {
        req.flash('success_messages', 'event was successfully created')
        res.redirect('/events')
      })
      .catch(err => next(err))
  },
  getRestaurant: (req, res, next) => {
    // 用id在資料庫找一筆資料
    Stone.findByPk(req.params.id, {
      // 整理格式再回傳
      raw: true
      // nest: true,
      // include: [Category]
    })
      .then(event => {
        if (!event) throw new Error("Event didn't exist!")
        res.render('event', { restaurant:event })
      })
      .catch(err => next(err))
  },
  editRestaurant: (req, res, next) => {
    Stone.findByPk(req.params.id, {
      raw: true
    })
      .then(event => {
        if (!event) throw new Error("Event didn't exist!")
        res.render('edit-event', { restaurant:event })
      })
      .catch(err => next(err))
  },
  putRestaurant: (req, res, next) => {
    const { name, address, date, description, party } = req.body
    if (!name) throw new Error('Event name is required!')
    const { file } = req
    // 非同步處理
    Promise.all([
      Stone.findByPk(req.params.id),
      // 把檔案傳到file-helpers處理
      localFileHandler(file)
    ])
      // 兩件事情都處理後
      .then(([event, filePath]) => {
        if (!event) throw new Error("Event didn't exist!")
        return event.update({
          name,
          address,
          date,
          description,
          // 如果有上傳照片就用filePath, 沒有則保留資料庫原有照片
          image: filePath || restaurant.image,
          party
        })
      })
      .then(() => {
        req.flash('success_message', 'event was successfully to update')
        res.redirect('/events')
      })
      .catch(err => next(err))
  },
  deleteRestaurant: (req, res, next) => {
    return Stone.findByPk(req.params.id)
      .then(event => {
        if (!event) throw new Error("Event didn't exist!")
        return event.destroy()
      })
      .then(() => res.redirect('/events'))
      .catch(err => next(err))
  }
  // ,
  // getUsers: (req, res, next) => {
  //   return User.findAll({
  //     raw: true
  //   })
  //     .then(users => res.render('admin/users', { users }))
  //     .catch(err => next(err))
  // },
  // patchUser: (req, res, next) => {
  //   return User.findByPk(req.params.id)
  //     .then(user => {
  //       if (!user) throw new Error("User didn't exist")
  //       if (user.email === 'root@example.com') {
  //         req.flash('error_messages', '禁止變更 root 權限')
  //         return res.redirect('back')
  //       }
  //       return user.update({
  //         isAdmin: !user.isAdmin
  //       })
  //     })
  //     .then(() => {
  //       req.flash('success_messages', '使用者權限變更成功')
  //       res.redirect('/admin/users')
  //     })
  //     .catch(err => next(err))
    
}
module.exports = adminController
