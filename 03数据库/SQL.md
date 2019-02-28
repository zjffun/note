# 交换两列的数据

## MySQL 实现

方案一：

    update paleo p1, paleo p2
    set p1.lat = p2.lng, p1.lng = p2.lat
    where p1.id = p2.id

方案二：  
原理可能是应该是 p1 和 p2 的修改互不影响

    update paleo p1, paleo p2
    set p1.lat = p1.lng, p2.lng = p2.lat

错误方法，试一下就赶紧回滚了吧！！！

    START TRANSACTION;
    UPDATE paleo set lat = lng, lng = lat;
    select * from paleo;
    -- ROLLBACK;
