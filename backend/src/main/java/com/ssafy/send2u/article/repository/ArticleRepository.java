package com.ssafy.send2u.article.repository;

import com.ssafy.send2u.article.entity.Article;
import com.ssafy.send2u.user.entity.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByArticleWriter(User writer);

}
