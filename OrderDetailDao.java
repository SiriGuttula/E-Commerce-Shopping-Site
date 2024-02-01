package com.youtube.jwt.dao;

import com.youtube.jwt.entity.OrderDetail;
import com.youtube.jwt.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderDetailDao extends CrudRepository<OrderDetail,Integer> {
    public List<OrderDetail> findByUser(User user);

    public List<OrderDetail> findByOrderStatus(String status);
}
