//
// Created by clpo on 1/13/24.
//

#include <httplib.h>
#include <filesystem>

namespace fs = std::filesystem;

//const std::filesystem::path currentPath = std::filesystem::current_path();

const std::string absolutePathPrefix = "/home/clpo/Documents/pet_ques_new/static_file";

std::string getFileExtension(const std::string& file_path) {
    size_t last_dot_pos = file_path.find_last_of('.');
    if (last_dot_pos != std::string::npos) {
        return file_path.substr(last_dot_pos + 1);
    }
    return "";
}

int main() {
    httplib::Server svr;

    // 处理GET请求，将静态文件映射到相应的路径
    svr.Get("/static/drink/(.*)", [&](const httplib::Request &req, httplib::Response &res) {
        std::string file_path = absolutePathPrefix + "/drink/" + req.matches[1].str();
        std::cout << file_path << std::endl;

        // 读取文件内容
        std::ifstream file(file_path, std::ios::binary);
        if (!file) {
            res.status = 404;
            return;
        }

        // 设置响应头
        res.set_header("Content-Type", "image/" + getFileExtension(req.path));

        // 将文件内容作为响应主体
        res.body = std::string(std::istreambuf_iterator<char>(file), {});
    });

    svr.Get("/static/medicine/(.*)", [&](const httplib::Request &req, httplib::Response &res) {
        std::string file_path = absolutePathPrefix + "/medicine/" + req.matches[1].str();
        std::cout << file_path << std::endl;

        // 读取文件内容
        std::ifstream file(file_path, std::ios::binary);
        if (!file) {
            res.status = 404;
            return;
        }

        // 设置响应头
        res.set_header("Content-Type", "image/" + getFileExtension(req.path));

        // 将文件内容作为响应主体
        res.body = std::string(std::istreambuf_iterator<char>(file), {});
    });

    svr.Get("/static/food/(.*)", [&](const httplib::Request &req, httplib::Response &res) {
        std::string file_path = absolutePathPrefix + "/food/" + req.matches[1].str();
        std::cout << file_path << std::endl;

        // 读取文件内容
        std::ifstream file(file_path, std::ios::binary);
        if (!file) {
            res.status = 404;
            return;
        }

        // 设置响应头
        res.set_header("Content-Type", "image/" + getFileExtension(req.path));

        // 将文件内容作为响应主体
        res.body = std::string(std::istreambuf_iterator<char>(file), {});
    });

    svr.Get("/static/present/(.*)", [&](const httplib::Request &req, httplib::Response &res) {
        std::string file_path = absolutePathPrefix + "/present/" + req.matches[1].str();
        std::cout << file_path << std::endl;

        // 读取文件内容
        std::ifstream file(file_path, std::ios::binary);
        if (!file) {
            res.status = 404;
            return;
        }

        // 设置响应头
        res.set_header("Content-Type", "image/" + getFileExtension(req.path));

        // 将文件内容作为响应主体
        res.body = std::string(std::istreambuf_iterator<char>(file), {});
    });

    svr.Get("/static/vup/(.*)", [&](const httplib::Request &req, httplib::Response &res) {
        std::string file_path = absolutePathPrefix + "/vup/" + req.matches[1].str();
        std::cout << file_path << std::endl;

        // 读取文件内容
        std::ifstream file(file_path, std::ios::binary);
        if (!file) {
            res.status = 404;
            return;
        }

        // 设置响应头
        res.set_header("Content-Type", "image/" + getFileExtension(req.path));

        // 将文件内容作为响应主体
        res.body = std::string(std::istreambuf_iterator<char>(file), {});
    });

    // 启动服务器
    svr.listen("192.168.116.129", 12432);

    return 0;
}

