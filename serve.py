import os
import re
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import urllib.parse

PORT = 8080

class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Range, Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            parts = urllib.parse.urlsplit(self.path)
            if not parts.path.endswith('/'):
                self.send_response(301)
                new_parts = (parts[0], parts[1], parts[2] + '/', parts[3], parts[4])
                new_url = urllib.parse.urlunsplit(new_parts)
                self.send_header("Location", new_url)
                self.end_headers()
                return None
            for index in "index.html", "index.htm":
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return super().send_head()

        ctype = self.guess_type(path)
        if path.endswith('.mov'):
            ctype = 'video/quicktime'

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        total_length = fs[6]

        range_header = self.headers.get('Range')
        if range_header:
            match = re.match(r'bytes=(\d+)-(\d*)', range_header)
            if match:
                start = int(match.group(1))
                end = int(match.group(2)) if match.group(2) else total_length - 1
                if start >= total_length:
                    self.send_error(416, "Requested Range Not Satisfiable")
                    f.close()
                    return None
                if end >= total_length:
                    end = total_length - 1

                length = end - start + 1
                self.send_response(206, "Partial Content")
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Range", f"bytes {start}-{end}/{total_length}")
                self.send_header("Content-Length", str(length))
                self.send_header("Accept-Ranges", "bytes")
                self.end_headers()
                f.seek(start)
                self.range_end = end
                return f

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(total_length))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        self.range_end = total_length - 1
        return f

    def copyfile(self, source, outputfile):
        try:
            range_end = getattr(self, 'range_end', None)
            if range_end is not None:
                bytes_to_read = range_end - source.tell() + 1
                chunk_size = 64 * 1024
                while bytes_to_read > 0:
                    read_amount = min(chunk_size, bytes_to_read)
                    data = source.read(read_amount)
                    if not data:
                        break
                    outputfile.write(data)
                    bytes_to_read -= len(data)
            else:
                super().copyfile(source, outputfile)
        except (ConnectionResetError, BrokenPipeError, ConnectionAbortedError):
            pass

if __name__ == '__main__':
    server_address = ('', PORT)
    httpd = ThreadingHTTPServer(server_address, RangeHTTPRequestHandler)
    print(f"Serving HTTP on port {PORT} (http://localhost:{PORT}/) with Threading and Range support...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
