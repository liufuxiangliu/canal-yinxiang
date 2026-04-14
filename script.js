new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    currentCategory: 'all',
    detailSlide: 0,
    swiperIndex: 0,
    currentProjectId: null,
    role: '',
    roleName: '',
    password: '',
    phone: '',
    address: '',
    backgroundImage: '',
    bannerImages: [],
    
    // 所有项目数据 - 初始默认数据
    allProjects: [
      { id: 1, name: "古法采耳", desc: "传统技艺 深度清洁", originalPrice: 108, groupPrice: 88, memberPrice: 80, duration: 30, hidden: false, category: "ear", detail: "", images: [], isHot: true },
      { id: 2, name: "精致洗耳", desc: "深层清洁 消炎杀菌", originalPrice: 128, groupPrice: 108, memberPrice: 98, duration: 40, hidden: false, category: "ear", detail: "", images: [], isHot: false },
      { id: 3, name: "会员采耳套餐", desc: "长期会员特惠", originalPrice: 188, groupPrice: 168, memberPrice: 158, duration: 60, hidden: false, category: "ear", detail: "", images: [], isHot: false },
      { id: 4, name: "肩颈SPA", desc: "舒缓肌肉 改善酸痛", originalPrice: 158, groupPrice: 128, memberPrice: 118, duration: 45, hidden: false, category: "spa", detail: "", images: [], isHot: false },
      { id: 5, name: "全身按摩", desc: "整体调理 深度放松", originalPrice: 198, groupPrice: 168, memberPrice: 158, duration: 60, hidden: false, category: "spa", detail: "", images: [], isHot: true },
      { id: 6, name: "背部拔罐", desc: "祛湿驱寒 排毒养颜", originalPrice: 118, groupPrice: 98, memberPrice: 88, duration: 30, hidden: false, category: "spa", detail: "", images: [], isHot: false },
      { id: 7, name: "VIP奢华SPA", desc: "至尊享受 全身调理", originalPrice: 358, groupPrice: 298, memberPrice: 268, duration: 90, hidden: false, category: "spa", detail: "", images: [], isHot: false },
      { id: 8, name: "头部按摩", desc: "舒缓疲劳 放松神经", originalPrice: 88, groupPrice: 68, memberPrice: 58, duration: 25, hidden: false, category: "single", detail: "", images: [], isHot: true },
      { id: 9, name: "面部清洁", desc: "深层清洁 净透肌肤", originalPrice: 98, groupPrice: 78, memberPrice: 68, duration: 30, hidden: false, category: "single", detail: "", images: [], isHot: false },
      { id: 10, name: "颈部调理", desc: "改善僵硬 促进循环", originalPrice: 108, groupPrice: 88, memberPrice: 78, duration: 30, hidden: false, category: "single", detail: "", images: [], isHot: false },
      { id: 11, name: "手臂按摩", desc: "缓解酸僵 放松肌肉", originalPrice: 88, groupPrice: 68, memberPrice: 58, duration: 25, hidden: false, category: "single", detail: "", images: [], isHot: false },
      { id: 12, name: "采耳+头部按摩套餐", desc: "经典组合 超值优惠", originalPrice: 168, groupPrice: 128, memberPrice: 118, duration: 50, hidden: false, category: "package", detail: "", images: [], isHot: true },
      { id: 13, name: "全身SPA超值套餐", desc: "肩颈+背部+头部放松", originalPrice: 298, groupPrice: 238, memberPrice: 218, duration: 90, hidden: false, category: "package", detail: "", images: [], isHot: false },
      { id: 14, name: "男士减压套餐", desc: "采耳+肩颈+头部调理", originalPrice: 258, groupPrice: 198, memberPrice: 178, duration: 75, hidden: false, category: "package", detail: "", images: [], isHot: false },
      { id: 15, name: "女士养颜套餐", desc: "采耳+面部清洁+头部", originalPrice: 238, groupPrice: 188, memberPrice: 168, duration: 70, hidden: false, category: "package", detail: "", images: [], isHot: false }
    ],

    // 分类定义
    baseCategoryList: [
      { key: "all", name: "全部" },
      { key: "ear", name: "运河采耳" },
      { key: "spa", name: "印象SPA" },
      { key: "single", name: "单项服务" },
      { key: "package", name: "店长推荐" }
    ],
    fullCategoryList: [
      { key: "all", name: "全部" },
      { key: "ear", name: "运河采耳" },
      { key: "spa", name: "印象SPA" },
      { key: "single", name: "单项服务" },
      { key: "package", name: "店长推荐" },
      { key: "hidden", name: "龙筋保养" }
    ],
    categoryOptions: [
      { key: "ear", name: "运河采耳" },
      { key: "spa", name: "印象SPA" },
      { key: "single", name: "单项服务" },
      { key: "package", name: "店长推荐" },
      { key: "hidden", name: "龙筋保养" }
    ]
  },

  computed: {
    categoryList: function() {
      var canSeeHidden = this.role === 'merchant' || this.role === 'super';
      return canSeeHidden ? this.fullCategoryList : this.baseCategoryList;
    },

    canSeeHidden: function() {
      return this.role === 'merchant' || this.role === 'super';
    },

    projectList: function() {
      var that = this;
      var list = this.allProjects.filter(function(p) {
        // 当前分类筛选
        if (that.currentCategory !== 'all') {
          if (that.currentCategory === 'hidden') {
            if (!p.hidden) return false;
          } else {
            if (p.category !== that.currentCategory) return false;
          }
        }
        // 权限筛选
        if (that.role !== 'merchant' && that.role !== 'super') {
          if (p.hidden) return false;
        }
        return true;
      });
      return list;
    },

    recommendList: function() {
      return this.allProjects.filter(function(p) {
        return p.isHot;
      });
    },

    currentProject: function() {
      if (!this.currentProjectId) return null;
      return this.allProjects.find(function(p) {
        return p.id === this.currentProjectId;
      }.bind(this));
    },

    filteredProjects: function() {
      var that = this;
      if (this.role === 'super') {
        return this.allProjects;
      } else if (this.role === 'admin') {
        return this.allProjects.filter(function(p) {
          return !p.hidden;
        });
      } else {
        // merchant can see all
        return this.allProjects;
      }
    }
  },

  mounted: function() {
    var that = this;
    // 自动轮播
    setInterval(function() {
      that.swiperIndex = (that.swiperIndex + 1) % (that.bannerImages.length || 1);
    }, 5000);
    // 读取本地存储
    this.loadFromStorage();
    // 更新背景
    if (this.backgroundImage) {
      document.getElementById('backgroundImage').src = this.backgroundImage;
    }
  },

  methods: {
    switchPage: function(page) {
      this.currentPage = page;
      // 自动轮播需要重置
      if (page === 'index') {
        this.swiperIndex = 0;
      }
    },

    switchCategory: function(key) {
      this.currentCategory = key;
    },

    goToCategory: function(key) {
      this.currentCategory = key;
      this.switchPage('all');
    },

    goToDetail: function(id) {
      this.currentProjectId = id;
      this.detailSlide = 0;
      this.switchPage('detail');
    },

    getCategoryName: function(key) {
      var cat = this.categoryOptions.find(function(c) {
        return c.key === key;
      });
      return cat ? cat.name : key;
    },

    goBack: function() {
      var history = this.history || [];
      if (history.length > 0) {
        var prev = history.pop();
        this.currentPage = prev.page;
        if (prev.projectId) {
          this.currentProjectId = prev.projectId;
        }
        this.history = history;
      } else {
        this.switchPage('index');
      }
    },

    // 权限验证
    login: function() {
      var pwd = this.password.trim();
      if (pwd === '258369') {
        this.role = 'merchant';
        this.roleName = '商家';
      } else if (pwd === 'ab258369') {
        this.role = 'admin';
        this.roleName = '管理员';
      } else if (pwd === 'yunheyinxiang1') {
        this.role = 'super';
        this.roleName = '超级管理员';
      } else {
        alert('密码错误');
        return;
      }
      localStorage.setItem('canalRole', this.role);
      alert('登录成功，当前角色：' + this.roleName);
      this.password = '';
    },

    logout: function() {
      this.role = '';
      this.roleName = '';
      localStorage.removeItem('canalRole');
      alert('已退出登录');
    },

    addNewProject: function() {
      var maxId = 0;
      this.allProjects.forEach(function(p) {
        if (p.id > maxId) maxId = p.id;
      });
      var newProject = {
        id: maxId + 1,
        name: "新项目",
        desc: "项目描述",
        originalPrice: 100,
        groupPrice: 80,
        memberPrice: 70,
        duration: 30,
        hidden: false,
        category: "ear",
        detail: "",
        images: [],
        isHot: false
      };
      this.allProjects.push(newProject);
      this.saveToStorage();
    },

    deleteImage: function(project, index) {
      project.images.splice(index, 1);
      this.saveToStorage();
    },

    onImageSelect: function(event) {
      // 文件选择，图片转base64
      var that = this;
      var files = event.target.files;
      if (!files || files.length === 0) return;
      
      // 这里需要找到对应的project，实际浏览器环境下可以通过dataset获取
      // 简化处理，添加到最后一个project
      var project = this.filteredProjects[this.filteredProjects.length - 1];
      
      var reader = new FileReader();
      reader.onload = function(e) {
        project.images.push(e.target.result);
        that.saveToStorage();
      };
      reader.readAsDataURL(files[0]);
      event.target.value = '';
    },

    onBackgroundSelect: function(event) {
      var that = this;
      var file = event.target.files[0];
      if (!file) return;
      
      var reader = new FileReader();
      reader.onload = function(e) {
        that.backgroundImage = e.target.result;
        document.getElementById('backgroundImage').src = that.backgroundImage;
        that.saveToStorage();
      };
      reader.readAsDataURL(file);
    },

    saveContact: function() {
      this.saveToStorage();
    },

    saveData: function() {
      this.saveToStorage();
    },

    loadFromStorage: function() {
      var role = localStorage.getItem('canalRole');
      var data = localStorage.getItem('canalProjects');
      var bg = localStorage.getItem('canalBackground');
      var phone = localStorage.getItem('canalPhone');
      var address = localStorage.getItem('canalAddress');
      var banner = localStorage.getItem('canalBanner');
      
      if (role) this.role = role;
      if (role === 'merchant') this.roleName = '商家';
      if (role === 'admin') this.roleName = '管理员';
      if (role === 'super') this.roleName = '超级管理员';
      if (data) this.allProjects = JSON.parse(data);
      if (bg) {
        this.backgroundImage = bg;
        if (document.getElementById('backgroundImage')) {
          document.getElementById('backgroundImage').src = bg;
        }
      }
      if (phone) this.phone = phone;
      if (address) this.address = address;
      if (banner) this.bannerImages = JSON.parse(banner);
    },

    saveToStorage: function() {
      localStorage.setItem('canalRole', this.role);
      localStorage.setItem('canalProjects', JSON.stringify(this.allProjects));
      localStorage.setItem('canalBackground', this.backgroundImage);
      localStorage.setItem('canalPhone', this.phone);
      localStorage.setItem('canalAddress', this.address);
      localStorage.setItem('canalBanner', JSON.stringify(this.bannerImages));
    }
  }
});
