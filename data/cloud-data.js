const recipeContents = {
  '白灼菜心': {
    category: '素菜',
    difficulty: 1,
    content: `## 白灼菜心

### 原料
- 菜心 500g
- 蒜末 适量
- 盐 适量
- 食用油 适量
- 生抽 适量
- 蚝油 适量

### 做法
1. 菜心洗净，去掉根部老的部分
2. 烧一锅水，水开后加入少许盐和食用油
3. 放入菜心焯水，约30秒到1分钟
4. 捞出沥干水分，整齐摆放在盘中
5. 蒜末铺在菜心上
6. 生抽、蚝油调成酱汁，淋在菜心上
7. 最后浇上热油即可

### 小贴士
- 焯水时间不要太久，保持菜心的爽脆口感`
  },
  '西红柿炒鸡蛋': {
    category: '素菜',
    difficulty: 1,
    content: `## 西红柿炒鸡蛋

### 原料
- 鸡蛋 3个
- 西红柿 2个
- 盐 适量
- 糖 适量
- 葱花 适量

### 做法
1. 鸡蛋打散，加少许盐搅拌均匀
2. 西红柿洗净切块
3. 热锅倒油，油热后倒入鸡蛋液
4. 鸡蛋成型后盛出备用
5. 锅中再倒少许油，放入西红柿翻炒
6. 西红柿出汁后，加入适量糖和盐
7. 放入炒好的鸡蛋，翻炒均匀
8. 出锅前撒上葱花即可

### 小贴士
- 鸡蛋要炒得嫩一些，不要太老`
  },
  '凉拌黄瓜': {
    category: '素菜',
    difficulty: 1,
    content: `## 凉拌黄瓜

### 原料
- 黄瓜 2根
- 蒜末 适量
- 醋 2勺
- 生抽 1勺
- 辣椒油 1勺
- 盐 适量

### 做法
1. 黄瓜洗净，用刀拍碎
2. 切成小段
3. 加入盐腌制10分钟
4. 调酱汁：蒜末、醋、生抽、辣椒油混合
5. 倒入黄瓜中拌匀即可

### 小贴士
- 黄瓜拍碎比切块更入味`
  },
  '酸辣土豆丝': {
    category: '素菜',
    difficulty: 2,
    content: `## 酸辣土豆丝

### 原料
- 土豆 2个
- 干辣椒 适量
- 醋 2勺
- 盐 适量
- 蒜末 适量
- 葱花 适量

### 做法
1. 土豆去皮，切成细丝
2. 土豆丝泡在清水中，去除淀粉
3. 热锅倒油，放入花椒和干辣椒爆香
4. 放入蒜末炒香
5. 捞出土豆丝沥干水分，放入锅中翻炒
6. 沿锅边淋入醋，翻炒均匀
7. 加入盐调味，翻炒至土豆丝断生

### 小贴士
- 土豆丝要泡水去淀粉，炒出来才脆`
  }
}

const recipeList = [
  { name: '拔丝土豆', difficulty: 2, category: '素菜' },
  { name: '白灼菜心', difficulty: 1, category: '素菜' },
  { name: '包菜炒鸡蛋粉丝', difficulty: 2, category: '素菜' },
  { name: '菠菜炒鸡蛋', difficulty: 1, category: '素菜' },
  { name: '炒滑蛋', difficulty: 2, category: '素菜' },
  { name: '炒茄子', difficulty: 2, category: '素菜' },
  { name: '炒青菜', difficulty: 1, category: '素菜' },
  { name: '葱煎豆腐', difficulty: 2, category: '素菜' },
  { name: '脆皮豆腐', difficulty: 3, category: '素菜' },
  { name: '地三鲜', difficulty: 3, category: '素菜' },
  { name: '干锅花菜', difficulty: 3, category: '素菜' },
  { name: '蚝油三鲜菇', difficulty: 2, category: '素菜' },
  { name: '蚝油生菜', difficulty: 1, category: '素菜' },
  { name: '红烧冬瓜', difficulty: 2, category: '素菜' },
  { name: '红烧茄子', difficulty: 2, category: '素菜' },
  { name: '虎皮青椒', difficulty: 2, category: '素菜' },
  { name: '话梅煮毛豆', difficulty: 2, category: '素菜' },
  { name: '鸡蛋羹', difficulty: 2, category: '素菜' },
  { name: '微波炉鸡蛋羹', difficulty: 1, category: '素菜' },
  { name: '蒸箱鸡蛋羹', difficulty: 2, category: '素菜' },
  { name: '鸡蛋花', difficulty: 1, category: '素菜' },
  { name: '鸡蛋火腿炒黄瓜', difficulty: 2, category: '素菜' },
  { name: '茄子炖土豆', difficulty: 2, category: '素菜' },
  { name: '家常日本豆腐', difficulty: 2, category: '素菜' },
  { name: '椒盐玉米', difficulty: 2, category: '素菜' },
  { name: '金钱蛋', difficulty: 3, category: '素菜' },
  { name: '金针菇日本豆腐煲', difficulty: 3, category: '素菜' },
  { name: '烤茄子', difficulty: 2, category: '素菜' },
  { name: '榄菜肉末四季豆', difficulty: 3, category: '素菜' },
  { name: '雷椒皮蛋', difficulty: 2, category: '素菜' },
  { name: '凉拌豆腐', difficulty: 1, category: '素菜' },
  { name: '凉拌黄瓜', difficulty: 1, category: '素菜' },
  { name: '凉拌金针菇', difficulty: 1, category: '素菜' },
  { name: '凉拌木耳', difficulty: 1, category: '素菜' },
  { name: '凉拌莴笋', difficulty: 1, category: '素菜' },
  { name: '凉拌油麦菜', difficulty: 1, category: '素菜' },
  { name: '皮蛋豆腐', difficulty: 1, category: '素菜' },
  { name: '蒲烧茄子', difficulty: 3, category: '素菜' },
  { name: '芹菜拌茶树菇', difficulty: 2, category: '素菜' },
  { name: '清炒花菜', difficulty: 1, category: '素菜' },
  { name: '清蒸南瓜', difficulty: 1, category: '素菜' },
  { name: '陕北熬豆角', difficulty: 3, category: '素菜' },
  { name: '上汤娃娃菜', difficulty: 2, category: '素菜' },
  { name: '手撕包菜', difficulty: 1, category: '素菜' },
  { name: '水油焖蔬菜', difficulty: 2, category: '素菜' },
  { name: '松仁玉米', difficulty: 2, category: '素菜' },
  { name: '素炒豆角', difficulty: 2, category: '素菜' },
  { name: '酸辣土豆丝', difficulty: 2, category: '素菜' },
  { name: '蒜蓉空心菜', difficulty: 1, category: '素菜' },
  { name: '蒜蓉西兰花', difficulty: 1, category: '素菜' },
  { name: '糖拌西红柿', difficulty: 1, category: '素菜' },
  { name: '莴笋叶煎饼', difficulty: 2, category: '素菜' },
  { name: '西红柿炒鸡蛋', difficulty: 1, category: '素菜' },
  { name: '西红柿豆腐汤羹', difficulty: 2, category: '素菜' },
  { name: '西葫芦炒鸡蛋', difficulty: 1, category: '素菜' },
  { name: '小炒藕丁', difficulty: 2, category: '素菜' },
  { name: '洋葱炒鸡蛋', difficulty: 1, category: '素菜' },
  { name: '印度葫芦丸子', difficulty: 4, category: '素菜' },
  { name: '印度土豆花菜', difficulty: 3, category: '素菜' },
  { name: '油醋爆蛋', difficulty: 2, category: '素菜' },
  { name: '澳门湿版免治牛肉饭', difficulty: 4, category: '荤菜' },
  { name: '巴基斯坦牛肉咖喱', difficulty: 4, category: '荤菜' },
  { name: '白菜猪肉炖粉条', difficulty: 3, category: '荤菜' },
  { name: '豉汁排骨', difficulty: 3, category: '荤菜' },
  { name: '豉汁蒸白鱔', difficulty: 4, category: '荤菜' },
  { name: '带把肘子', difficulty: 5, category: '荤菜' },
  { name: '冬瓜酿肉', difficulty: 3, category: '荤菜' },
  { name: '豆豉鲮鱼油麦菜', difficulty: 2, category: '荤菜' },
  { name: '番茄红酱', difficulty: 3, category: '荤菜' },
  { name: '粉蒸肉', difficulty: 3, category: '荤菜' },
  { name: '腐乳肉', difficulty: 3, category: '荤菜' },
  { name: '干煸仔鸡', difficulty: 4, category: '荤菜' },
  { name: '宫保鸡丁', difficulty: 3, category: '荤菜' },
  { name: '咕噜肉', difficulty: 4, category: '荤菜' },
  { name: '广式萝卜牛腩', difficulty: 4, category: '荤菜' },
  { name: '贵州辣子鸡', difficulty: 4, category: '荤菜' },
  { name: '荷兰豆炒腊肠', difficulty: 2, category: '荤菜' },
  { name: '黑椒牛柳', difficulty: 3, category: '荤菜' },
  { name: '红烧鸡翅', difficulty: 2, category: '荤菜' },
  { name: '简易红烧肉', difficulty: 3, category: '荤菜' },
  { name: '南派红烧肉', difficulty: 4, category: '荤菜' },
  { name: '红烧猪蹄', difficulty: 4, category: '荤菜' },
  { name: '湖南家常红烧肉', difficulty: 3, category: '荤菜' },
  { name: '虎皮肘子', difficulty: 5, category: '荤菜' },
  { name: '黄瓜炒肉', difficulty: 1, category: '荤菜' },
  { name: '黄焖鸡', difficulty: 3, category: '荤菜' },
  { name: '黄油鸡', difficulty: 3, category: '荤菜' },
  { name: '徽派红烧肉', difficulty: 4, category: '荤菜' },
  { name: '回锅肉', difficulty: 3, category: '荤菜' },
  { name: '尖椒炒牛肉', difficulty: 3, category: '荤菜' },
  { name: '尖叫牛蛙', difficulty: 4, category: '荤菜' },
  { name: '煎烤羊排', difficulty: 3, category: '荤菜' },
  { name: '姜炒鸡', difficulty: 2, category: '荤菜' },
  { name: '姜葱捞鸡', difficulty: 3, category: '荤菜' },
  { name: '酱牛肉', difficulty: 4, category: '荤菜' },
  { name: '酱排骨', difficulty: 4, category: '荤菜' },
  { name: '茭白炒肉', difficulty: 2, category: '荤菜' },
  { name: '椒盐排条', difficulty: 3, category: '荤菜' },
  { name: '芥末罗氏虾', difficulty: 3, category: '荤菜' },
  { name: '咖喱肥牛', difficulty: 2, category: '荤菜' },
  { name: '烤鸡翅', difficulty: 2, category: '荤菜' },
  { name: '可乐鸡翅', difficulty: 2, category: '荤菜' },
  { name: '口水鸡', difficulty: 4, category: '荤菜' },
  { name: '辣椒炒肉', difficulty: 2, category: '荤菜' },
  { name: '老妈蹄花', difficulty: 4, category: '荤菜' },
  { name: '老式锅包肉', difficulty: 4, category: '荤菜' },
  { name: '冷吃兔', difficulty: 4, category: '荤菜' },
  { name: '荔枝肉', difficulty: 4, category: '荤菜' },
  { name: '凉拌鸡丝', difficulty: 2, category: '荤菜' },
  { name: '卤菜', difficulty: 4, category: '荤菜' },
  { name: '萝卜炖羊排', difficulty: 4, category: '荤菜' },
  { name: '麻辣香锅', difficulty: 4, category: '荤菜' },
  { name: '麻婆豆腐', difficulty: 3, category: '荤菜' },
  { name: '蚂蚁上树', difficulty: 3, category: '荤菜' },
  { name: '梅菜扣肉', difficulty: 4, category: '荤菜' },
  { name: '奶酪培根通心粉', difficulty: 3, category: '荤菜' },
  { name: '牛排', difficulty: 3, category: '荤菜' },
  { name: '农家一碗香', difficulty: 3, category: '荤菜' },
  { name: '啤酒鸭', difficulty: 3, category: '荤菜' },
  { name: '黔式腊肠娃娃菜', difficulty: 3, category: '荤菜' },
  { name: '青椒土豆炒肉', difficulty: 2, category: '荤菜' },
  { name: '清蒸鳜鱼', difficulty: 3, category: '荤菜' },
  { name: '肉饼炖蛋', difficulty: 2, category: '荤菜' },
  { name: '杀猪菜', difficulty: 4, category: '荤菜' },
  { name: '山西过油肉', difficulty: 4, category: '荤菜' },
  { name: '商芝肉', difficulty: 4, category: '荤菜' },
  { name: '瘦肉土豆片', difficulty: 2, category: '荤菜' },
  { name: '水煮牛肉', difficulty: 4, category: '荤菜' },
  { name: '水煮肉片', difficulty: 4, category: '荤菜' },
  { name: '蒜苔炒肉末', difficulty: 2, category: '荤菜' },
  { name: '台式卤肉饭', difficulty: 3, category: '荤菜' },
  { name: '糖醋里脊', difficulty: 3, category: '荤菜' },
  { name: '糖醋排骨', difficulty: 3, category: '荤菜' },
  { name: '甜辣烤全翅', difficulty: 3, category: '荤菜' },
  { name: '土豆炖排骨', difficulty: 3, category: '荤菜' },
  { name: '无骨鸡爪', difficulty: 3, category: '荤菜' },
  { name: '西红柿牛腩', difficulty: 4, category: '荤菜' },
  { name: '西红柿土豆炖牛肉', difficulty: 4, category: '荤菜' },
  { name: '乡村啤酒鸭', difficulty: 3, category: '荤菜' },
  { name: '香干芹菜炒肉', difficulty: 2, category: '荤菜' },
  { name: '香干肉丝', difficulty: 2, category: '荤菜' },
  { name: '香煎五花肉', difficulty: 2, category: '荤菜' },
  { name: '香辣鸡爪煲', difficulty: 4, category: '荤菜' },
  { name: '湘祁米夫鸭', difficulty: 4, category: '荤菜' },
  { name: '小炒黄牛肉', difficulty: 4, category: '荤菜' },
  { name: '小炒鸡肝', difficulty: 3, category: '荤菜' },
  { name: '小炒肉', difficulty: 2, category: '荤菜' },
  { name: '小米辣炒肉', difficulty: 2, category: '荤菜' },
  { name: '小酥肉', difficulty: 3, category: '荤菜' },
  { name: '新疆大盘鸡', difficulty: 4, category: '荤菜' },
  { name: '血浆鸭', difficulty: 5, category: '荤菜' },
  { name: '羊排焖面', difficulty: 4, category: '荤菜' },
  { name: '洋葱炒猪肉', difficulty: 2, category: '荤菜' },
  { name: '意式烤鸡', difficulty: 3, category: '荤菜' },
  { name: '鱼香茄子', difficulty: 3, category: '荤菜' },
  { name: '鱼香肉丝', difficulty: 3, category: '荤菜' },
  { name: '枝竹羊腩煲', difficulty: 4, category: '荤菜' },
  { name: '猪皮冻', difficulty: 4, category: '荤菜' },
  { name: '猪肉烩酸菜', difficulty: 3, category: '荤菜' },
  { name: '柱候牛腩', difficulty: 4, category: '荤菜' },
  { name: '孜然牛肉', difficulty: 3, category: '荤菜' },
  { name: '醉排骨', difficulty: 4, category: '荤菜' },
  { name: '白灼虾', difficulty: 1, category: '水产' },
  { name: '鳊鱼炖豆腐', difficulty: 3, category: '水产' },
  { name: '蛏抱蛋', difficulty: 3, category: '水产' },
  { name: '葱烧海参', difficulty: 5, category: '水产' },
  { name: '葱油桂鱼', difficulty: 3, category: '水产' },
  { name: '干煎阿根廷红虾', difficulty: 3, category: '水产' },
  { name: '红烧鲤鱼', difficulty: 3, category: '水产' },
  { name: '红烧鱼', difficulty: 3, category: '水产' },
  { name: '红烧鱼头', difficulty: 3, category: '水产' },
  { name: '黄油煎虾', difficulty: 2, category: '水产' },
  { name: '烤鱼', difficulty: 4, category: '水产' },
  { name: '酱炖蟹', difficulty: 4, category: '水产' },
  { name: '芥末黄油罗氏虾', difficulty: 3, category: '水产' },
  { name: '咖喱炒蟹', difficulty: 4, category: '水产' },
  { name: '鲤鱼炖白菜', difficulty: 3, category: '水产' },
  { name: '清蒸鲈鱼', difficulty: 2, category: '水产' },
  { name: '清蒸生蚝', difficulty: 2, category: '水产' },
  { name: '肉蟹煲', difficulty: 5, category: '水产' },
  { name: '水煮鱼', difficulty: 4, category: '水产' },
  { name: '蒜蓉虾', difficulty: 2, category: '水产' },
  { name: '蒜香黄油虾', difficulty: 2, category: '水产' },
  { name: '糖醋鲤鱼', difficulty: 4, category: '水产' },
  { name: '微波葱姜黑鳕鱼', difficulty: 2, category: '水产' },
  { name: '香煎翘嘴鱼', difficulty: 3, category: '水产' },
  { name: '响油鳝丝', difficulty: 4, category: '水产' },
  { name: '小龙虾', difficulty: 4, category: '水产' },
  { name: '油焖大虾', difficulty: 3, category: '水产' },
  { name: '茶叶蛋', difficulty: 2, category: '早餐' },
  { name: '蛋煎糍粑', difficulty: 3, category: '早餐' },
  { name: '桂圆红枣粥', difficulty: 2, category: '早餐' },
  { name: '韩国麻药鸡蛋', difficulty: 3, category: '早餐' },
  { name: '鸡蛋三明治', difficulty: 1, category: '早餐' },
  { name: '煎饺', difficulty: 2, category: '早餐' },
  { name: '金枪鱼酱三明治', difficulty: 1, category: '早餐' },
  { name: '空气炸锅面包片', difficulty: 1, category: '早餐' },
  { name: '美式炒蛋', difficulty: 2, category: '早餐' },
  { name: '牛奶燕麦', difficulty: 1, category: '早餐' },
  { name: '手抓饼', difficulty: 2, category: '早餐' },
  { name: '水煮玉米', difficulty: 1, category: '早餐' },
  { name: '苏格兰蛋', difficulty: 4, category: '早餐' },
  { name: '太阳蛋', difficulty: 2, category: '早餐' },
  { name: '溏心蛋', difficulty: 2, category: '早餐' },
  { name: '吐司果酱', difficulty: 1, category: '早餐' },
  { name: '完美水煮蛋', difficulty: 1, category: '早餐' },
  { name: '微波炉蛋糕', difficulty: 2, category: '早餐' },
  { name: '微波炉荷包蛋', difficulty: 1, category: '早餐' },
  { name: '微波炉蒸蛋', difficulty: 1, category: '早餐' },
  { name: '温泉蛋', difficulty: 2, category: '早餐' },
  { name: '燕麦鸡蛋饼', difficulty: 2, category: '早餐' },
  { name: '意式香肠北非蛋', difficulty: 3, category: '早餐' },
  { name: '蒸花卷', difficulty: 3, category: '早餐' },
  { name: '蒸水蛋', difficulty: 2, category: '早餐' },
  { name: '炒方便面', difficulty: 2, category: '主食' },
  { name: '炒河粉', difficulty: 3, category: '主食' },
  { name: '炒凉粉', difficulty: 3, category: '主食' },
  { name: '炒馍', difficulty: 2, category: '主食' },
  { name: '炒年糕', difficulty: 2, category: '主食' },
  { name: '炒意大利面', difficulty: 2, category: '主食' },
  { name: '葱油拌面', difficulty: 2, category: '主食' },
  { name: '蛋包饭', difficulty: 3, category: '主食' },
  { name: '蛋炒饭', difficulty: 1, category: '主食' },
  { name: '电饭煲三文鱼炊饭', difficulty: 2, category: '主食' },
  { name: '豆角焖面', difficulty: 3, category: '主食' },
  { name: '韩式拌饭', difficulty: 2, category: '主食' },
  { name: '河南蒸面条', difficulty: 3, category: '主食' },
  { name: '红芸豆拌饭', difficulty: 2, category: '主食' },
  { name: '火腿饭团', difficulty: 2, category: '主食' },
  { name: '基础牛奶面包', difficulty: 4, category: '主食' },
  { name: '茄子肉煎饼', difficulty: 3, category: '主食' },
  { name: '鲣鱼海苔玉米饭', difficulty: 1, category: '主食' },
  { name: '酱拌荞麦面', difficulty: 2, category: '主食' },
  { name: '韭菜盒子', difficulty: 4, category: '主食' },
  { name: '可乐炒饭', difficulty: 2, category: '主食' },
  { name: '空气炸锅照烧鸡饭', difficulty: 2, category: '主食' },
  { name: '醪糟小汤圆', difficulty: 2, category: '主食' },
  { name: '老干妈拌面', difficulty: 1, category: '主食' },
  { name: '老友猪肉粉', difficulty: 3, category: '主食' },
  { name: '烙饼', difficulty: 3, category: '主食' },
  { name: '利提巧卡', difficulty: 3, category: '主食' },
  { name: '凉粉', difficulty: 2, category: '主食' },
  { name: '螺蛳粉', difficulty: 3, category: '主食' },
  { name: '麻辣减脂荞麦面', difficulty: 2, category: '主食' },
  { name: '麻油拌面', difficulty: 1, category: '主食' },
  { name: '电饭煲蒸米饭', difficulty: 1, category: '主食' },
  { name: '煮锅蒸米饭', difficulty: 2, category: '主食' },
  { name: '披萨饼皮', difficulty: 4, category: '主食' },
  { name: '热干面', difficulty: 3, category: '主食' },
  { name: '日式肥牛丼饭', difficulty: 2, category: '主食' },
  { name: '日式咖喱饭', difficulty: 2, category: '主食' },
  { name: '肉蛋盖饭', difficulty: 2, category: '主食' },
  { name: '陕西油泼面', difficulty: 3, category: '主食' },
  { name: '芝麻烧饼', difficulty: 4, category: '主食' },
  { name: '手工水饺', difficulty: 3, category: '主食' },
  { name: '酸辣蕨根粉', difficulty: 2, category: '主食' },
  { name: '汤面', difficulty: 1, category: '主食' },
  { name: '微波炉腊肠煲仔饭', difficulty: 2, category: '主食' },
  { name: '西红柿鸡蛋挂面', difficulty: 1, category: '主食' },
  { name: '鲜肉烧卖', difficulty: 4, category: '主食' },
  { name: '咸肉菜饭', difficulty: 3, category: '主食' },
  { name: '扬州炒饭', difficulty: 3, category: '主食' },
  { name: '意式肉酱面', difficulty: 3, category: '主食' },
  { name: '印度烤饼', difficulty: 3, category: '主食' },
  { name: '印度焖饭', difficulty: 3, category: '主食' },
  { name: '鹰嘴豆炸饼', difficulty: 4, category: '主食' },
  { name: '炸酱面', difficulty: 3, category: '主食' },
  { name: '照烧鸡腿饭', difficulty: 2, category: '主食' },
  { name: '蒸卤面', difficulty: 3, category: '主食' },
  { name: '中式馅饼', difficulty: 4, category: '主食' },
  { name: '猪油拌饭', difficulty: 1, category: '主食' },
  { name: '煮泡面加蛋', difficulty: 1, category: '主食' },
  { name: '半成品意面', difficulty: 1, category: '半成品加工' },
  { name: '空气炸锅鸡翅中', difficulty: 2, category: '半成品加工' },
  { name: '空气炸锅羊排', difficulty: 2, category: '半成品加工' },
  { name: '懒人蛋挞', difficulty: 2, category: '半成品加工' },
  { name: '凉皮', difficulty: 3, category: '半成品加工' },
  { name: '牛油火锅底料', difficulty: 3, category: '半成品加工' },
  { name: '速冻馄饨', difficulty: 1, category: '半成品加工' },
  { name: '速冻水饺', difficulty: 1, category: '半成品加工' },
  { name: '速冻汤圆', difficulty: 1, category: '半成品加工' },
  { name: '炸薯条', difficulty: 2, category: '半成品加工' },
  { name: '昂刺鱼豆腐汤', difficulty: 3, category: '汤与粥' },
  { name: '陈皮排骨汤', difficulty: 3, category: '汤与粥' },
  { name: '番茄牛肉蛋花汤', difficulty: 3, category: '汤与粥' },
  { name: '勾芡香菇汤', difficulty: 2, category: '汤与粥' },
  { name: '黄瓜皮蛋汤', difficulty: 2, category: '汤与粥' }
]

const chefContents = {
  kitchen: {
    title: '厨房准备',
    content: `厨房准备

工欲善其事，必先利其器。要想在家做出好吃的菜，需要先准备好厨房的常用设备和工具。

## 常用设备

### 燃气灶
最常用的灶具，选择火力强劲、均匀的为佳。

### 油烟机
烹饪时排除油烟的重要设备，要定期清洗。

### 微波炉
快速加热食物的好帮手，也可用来做一些简单的菜品。

### 空气炸锅
近年来流行的健康烹饪设备，用少量油即可做出酥脆食物。

### 电压力锅
快速烹饪肉类、豆类等难熟食材的神器。

## 常用工具

### 锅具
- 炒锅：用于炒菜、煎炸
- 汤锅：用于煮汤、煮粥
- 蒸锅：用于蒸菜
- 不粘锅：用于煎蛋、煎鱼等

### 刀具
- 菜刀：切菜用
- 水果刀：切水果用
- 剪刀：剪食材用

### 其他
- 砧板：切菜时使用
- 漏勺：沥干水分
- 勺子：搅拌用
- 碗盆：装食材用`
  },
  choose: {
    title: '如何选择现在吃什么',
    content: `如何选择现在吃什么

每天都在纠结吃什么？这几个方法帮你快速决定！

## 方法一：看冰箱

看看冰箱里有什么食材，就做什么菜。冰箱里剩下的食材往往是最适合做的。

## 方法二：看季节

选择当季的食材，不仅新鲜美味，也更健康。

- 春季：春笋、菠菜、韭菜
- 夏季：黄瓜、西红柿、茄子
- 秋季：南瓜、莲藕、山药
- 冬季：白菜、萝卜、土豆

## 方法三：看时间

- 时间充裕：可以做复杂的菜
- 时间紧张：选择快手菜
- 带饭：选择不易变质的菜

## 方法四：看心情

- 想吃肉：选择荤菜
- 想清淡：选择素菜
- 想偷懒：选择半成品加工

## 推荐搭配

### 一个人的晚餐
- 一荤一素一汤
- 或者炒饭、面条等主食

### 两个人的晚餐
- 两荤一素一汤
- 或者火锅、烤肉等

### 家庭的周末聚餐
- 四荤两素一汤
- 加几个冷盘`
  },
  taboo: {
    title: '食材相克与禁忌',
    content: `食材相克与禁忌

有些食材不能一起吃，需要特别注意！

## 常见相克组合

### 海鲜类
- 螃蟹+柿子：会引起腹泻
- 虾+维生素C：会产生砒霜（大量食用时）

### 肉类
- 猪肉+牛肉：不易消化
- 羊肉+醋：可能损伤脾胃

### 蔬菜类
- 黄瓜+花生：可能导致腹泻
- 菠菜+豆腐：影响钙质吸收

## 食用禁忌

### 某些人群需要注意
- 痛风患者：避免高嘌呤食物如海鲜、动物内脏
- 糖尿病患者：避免高糖食物
- 高血压患者：少盐少油

### 食物过敏
- 海鲜过敏：避免所有海鲜
- 花生过敏：注意加工食品
- 麸质过敏：避免面食

## 健康的饮食习惯

1. 多样化饮食，不要偏食
2. 适量为主，不要暴饮暴食
3. 新鲜为主，少吃加工食品
4. 荤素搭配，营养均衡`
  },
  pressure: {
    title: '高压力锅',
    content: `高压力锅的使用

电压力锅是现代厨房的神器，可以大大缩短烹饪时间。

## 基本使用

1. 清洗内胆
2. 放入食材和水
3. 盖上锅盖，确保密封
4. 选择功能模式
5. 等待自动完成

## 适用食材

### 肉类
- 炖牛肉：30-40分钟
- 炖排骨：25-30分钟
- 炖鸡：20-25分钟

### 豆类
- 煮红豆：40-50分钟
- 煮绿豆：30-40分钟
- 炖银耳：30分钟

### 汤类
- 排骨汤：40-50分钟
- 鸡汤：30-40分钟
- 粥：20-30分钟

## 注意事项

1. 不要超过最大水位线
2. 泄压后再打开盖子
3. 使用后及时清洗
4. 定期检查密封圈`
  },
  airfryer: {
    title: '空气炸锅',
    content: `空气炸锅的使用

空气炸锅可以用很少的油做出酥脆的食物。

## 基本使用

1. 预热3-5分钟
2. 放入食材
3. 设置温度和时间
4. 中途翻面
5. 取出享用

## 常用食谱

### 炸鸡翅
- 温度：200℃
- 时间：15-20分钟
- 腌制后效果更好

### 炸薯条
- 温度：200℃
- 时间：15-20分钟
- 稍微喷一点油更脆

### 烤鱼
- 温度：180℃
- 时间：12-15分钟

### 烤蔬菜
- 温度：180℃
- 时间：10-15分钟

## 注意事项

1. 不要放太多食材
2. 中途翻面更均匀
3. 炸锅垫纸方便清洗
4. 取出时注意烫手`
  },
  deodorize: {
    title: '去腥',
    content: `去腥的方法

有些食材有腥味，需要处理后才能更好吃。

## 肉类去腥

### 猪肉
- 浸泡：清水浸泡1-2小时
- 焯水：冷水下锅，加料酒、姜片
- 加料：烹饪时加料酒、姜、蒜

### 牛肉
- 浸泡：清水浸泡1小时
- 腌制：加料酒、淀粉、蛋清
- 加料：加姜、蒜、洋葱

### 鸡肉
- 焯水：温水下锅
- 加料：加料酒、姜、葱

## 海鲜去腥

### 鱼类
- 去鳞：刮干净鱼鳞
- 去内脏：去除黑膜
- 腌制：加料酒、姜、葱
- 烹饪：加醋或柠檬

### 虾类
- 去线：去掉虾线
- 浸泡：加料酒浸泡
- 烹饪：加姜、蒜

### 螃蟹
- 刷洗：刷干净外壳
- 去腮：去除蟹腮
- 烹饪：加料酒、姜、蒜

## 蔬菜去腥

### 苦瓜
- 盐腌：撒盐腌制10分钟
- 焯水：快速过水

### 芹菜
- 焯水：可以去苦味`
  },
  safety: {
    title: '食品安全',
    content: `食品安全知识

保证食品安全，是健康饮食的前提。

## 食材选购

### 新鲜度判断
- 肉类：颜色红润，有弹性
- 鱼类：眼睛清亮，鳞片完整
- 蔬菜：颜色鲜亮，无黄叶
- 水果：成熟度适中，无腐烂

### 保质期
- 注意查看生产日期和保质期
- 冷藏食品尽快食用
- 冷冻食品不要反复解冻

## 保存方法

### 冷藏
- 生肉：放在最冷的地方
- 蔬菜：用保鲜袋装好
- 剩菜：尽快放入冰箱

### 冷冻
- 分装：按份量分开冷冻
- 标记：注明日期
- 解冻：提前放在冷藏室

## 烹饪安全

1. 生熟分开
2. 彻底加热
3. 勤洗手
4. 餐具消毒

## 常见问题

### 隔夜菜能吃吗？
- 及时冷藏可以吃
- 充分加热后食用
- 绿叶菜尽量不吃隔夜的

### 变质食物
- 有异味不要吃
- 发霉及时扔掉
- 不要觉得可惜`
  },
  microwave: {
    title: '微波炉',
    content: `微波炉的使用

微波炉不仅是加热工具，还能做出很多美食。

## 基本功能

### 加热
- 汤类：2-3分钟
- 剩菜：2-4分钟
- 牛奶：1-2分钟

### 烹饪

#### 微波炉蒸蛋
1. 鸡蛋打散，加温水
2. 加盐调味
3. 高火3-4分钟
4. 取出淋上酱油

#### 微波炉蛋糕
1. 面粉、糖、鸡蛋搅拌
2. 放入微波炉
3. 高火2-3分钟

#### 微波炉烤红薯
1. 红薯洗净
2. 表面扎几个孔
3. 高火5-6分钟
4. 翻面再烤5分钟

## 注意事项

1. 金属容器不能放进去
2. 封闭容器要打开口
3. 加热时间不宜过长
4. 取出时注意烫手

## 清洁保养

- 定期清理内部
- 保持门密封好
- 不要用腐蚀性清洁剂`
  },
  blanch: {
    title: '学习焯水',
    content: `焯水的技巧

焯水是烹饪中的重要步骤，可以让食材更美味。

## 目的

1. 去腥：去除肉类血水
2. 变色：让蔬菜更翠绿
3. 去苦：去除部分苦味
4. 预熟：缩短后续烹饪时间

## 方法

### 冷水焯
- 适用于肉类
- 肉冷水下锅
- 加料酒、姜片
- 煮开后捞出洗净

### 热水焯
- 适用于蔬菜
- 水开后放入
- 快速过水
- 捞出沥干

## 技巧

### 蔬菜焯水
- 水里加盐和油
- 保持蔬菜颜色
- 不要焯太久

### 肉类焯水
- 冷水下锅
- 水开就捞出
- 洗净浮沫

## 适用食材

- 排骨、鸡肉：冷水焯
- 青菜、豆角：热水焯
- 虾仁：热水焯至变色
- 豆腐：热水焯去豆腥`
  },
  stirfry: {
    title: '学习炒与煎',
    content: `炒与煎的技巧

炒和煎是中餐最常用的烹饪方法。

## 炒的基本技巧

### 热锅凉油
1. 锅烧热再放油
2. 油热后倒出
3. 再加冷油炒菜
4. 这样不粘锅

### 火候
- 大火：快炒蔬菜
- 中火：炒肉类
- 小火：慢炒入味

### 顺序
1. 先炒配料
2. 再炒主料
3. 调味出锅

## 煎的基本技巧

### 冷锅热油
1. 锅冷时放油
2. 油热后转中火
3. 放入食材
4. 煎至金黄再翻面

### 不粘锅
- 锅要够热
- 油要够多
- 不要急着翻面

## 常见问题

### 炒菜粘锅
- 锅要烧热
- 油要够多
- 食材要沥干

### 炒菜出水
- 大火快炒
- 先放盐
- 不要盖锅盖

## 美味炒菜推荐

- 蛋炒饭：隔夜饭更好吃
- 酸辣土豆丝：土豆丝要泡水
- 西红柿炒鸡蛋：先炒蛋再炒西红柿
- 蒜蓉青菜：大火快炒`
  },
  cold: {
    title: '学习凉拌',
    content: `凉拌菜的制作

凉拌菜清爽开胃，是夏天的必备。

## 基本步骤

1. 食材处理
2. 焯水或清洗
3. 调味拌匀
4. 冷藏入味

## 常用调味

### 基础调味
- 蒜末：增香
- 酱油：调味
- 醋：开胃
- 盐：基础味道
- 辣椒油：增辣

### 特色调味
- 花椒油：麻香味
- 芝麻酱：浓郁
- 花生碎：香脆
- 葱花香菜：提味

## 经典凉拌菜

### 凉拌黄瓜
1. 黄瓜拍碎
2. 切段
3. 加盐腌制
4. 调料拌匀

### 凉拌木耳
1. 木耳泡发
2. 焯水过凉
3. 加蒜末、辣椒油
4. 拌匀即可

### 凉拌金针菇
1. 金针菇去根
2. 焯水过凉
3. 加蒜末、醋、酱油
4. 淋上热油

## 注意事项

1. 食材要新鲜
2. 调味要适度
3. 拌匀很重要
4. 冷藏更入味`
  },
  marinate: {
    title: '学习腌',
    content: `腌制技巧

腌制可以让食材更入味、更嫩滑。

## 肉类腌制

### 基础腌制
- 料酒：去腥
- 盐：调味
- 生抽：上色
- 淀粉：嫩滑
- 蛋清：更嫩

### 时间
- 炒肉片：10-15分钟
- 炖肉：30分钟以上
- 烤肉：1-2小时

## 蔬菜腌制

### 酱腌
- 盐杀水
- 挤干水分
- 加入酱料
- 冷藏保存

### 泡制
- 盐水浸泡
- 添加调料
- 密封保存
- 等待发酵

## 常见腌制

### 酸黄瓜
1. 黄瓜切条
2. 盐腌制
3. 加醋、糖
4. 冷藏3天

### 辣白菜
1. 白菜切片
2. 盐腌制
3. 加辣椒粉
4. 发酵一周

## 注意事项

1. 容器要干净
2. 调味要适量
3. 注意保存温度
4. 腌制时间要够`
  },
  steam: {
    title: '学习蒸',
    content: `蒸菜的技巧

蒸是一种健康美味的烹饪方式。

## 蒸具选择

### 蒸锅
- 传统蒸锅
- 电蒸锅
- 微波炉蒸功能

### 注意事项
- 水要加够
- 防止干烧
- 及时排水

## 蒸制时间

### 海鲜
- 鱼：10-15分钟
- 虾：5-8分钟
- 螃蟹：15-20分钟

### 肉类
- 鸡肉：20-30分钟
- 排骨：30-40分钟
- 肉饼：15-20分钟

### 主食
- 馒头：20-30分钟
- 米饭：30-40分钟
- 包子：15-20分钟

### 蔬菜
- 青菜：3-5分钟
- 土豆：15-20分钟
- 茄子：10-15分钟

## 蒸鱼技巧

1. 鱼身划刀
2. 姜片去腥
3. 葱段铺底
4. 大火蒸制
5. 淋上热油

## 蒸菜推荐

- 清蒸鲈鱼
- 蒜蓉粉丝虾
- 粉蒸肉
- 蒸鸡蛋羹
- 香菇蒸鸡`
  },
  boil: {
    title: '学习煮',
    content: `煮的技巧

煮是最基础的烹饪方法。

## 煮的种类

### 清水煮
- 白灼：快速过水
- 水煮：完全煮熟
- 汆：沸水下料

### 汤煮
- 清汤：大火烧开
- 浓汤：小火慢炖

## 煮的技巧

### 煮面
1. 水开下锅
2. 加盐防粘
3. 点水三次
4. 过冷水更好吃

### 煮粥
1. 提前浸泡
2. 热水下米
3. 搅拌防粘
4. 小火慢煮

### 煮汤
1. 冷水下肉
2. 大火烧开
3. 撇去浮沫
4. 小火慢炖

## 注意事项

1. 水要加够
2. 火候要控制
3. 及时搅拌
4. 注意防溢

## 煮菜推荐

- 白灼虾
- 煮饺子
- 煮汤圆
- 皮蛋瘦肉粥
- 西红柿鸡蛋汤`
  }
}

module.exports = {
  recipeContents,
  recipeList,
  chefContents
}
