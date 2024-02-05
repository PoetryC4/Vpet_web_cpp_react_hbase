import os


class FileUtils:
    @staticmethod
    def get_all_files_in_folder(folder_path):
        all_files = []

        # 遍历文件夹
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                # 获取文件的绝对路径
                file_path = os.path.join(root, file)
                all_files.append(file_path)

        return all_files
