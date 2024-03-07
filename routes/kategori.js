var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelKategori = require("../model/model_kategori.js");

router.get("/", async function (req, res, next) {
  let rows = await ModelKategori.getAll();
  res.render("kategori/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("kategori/create", {
    nama_kategori: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let data = {
      nama_kategori,
    };
    await ModelKategori.Store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kategori");
  } catch (error) {
    req.flash("error", "gagal menyimpan data");
    res.redirect("/kategori");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let rows = await ModelKategori.getId(id);
  res.render("kategori/edit", {
    id: rows[0].id_kategori,
    nama_kategori: rows[0].nama_kategori,
  });
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let nama_kategori = req.body.nama_kategori;
    let data = { nama_kategori };
    let updateSuccess = await ModelKategori.Update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/kategori");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/kategori");
  }
});


router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelKategori.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/kategori");
});

module.exports = router;
